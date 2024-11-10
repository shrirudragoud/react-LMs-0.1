import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MistralClient from '@mistralai/mistralai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  currentPageDescription?: string;
  onExpand?: (expanded: boolean) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  currentPageDescription,
  onExpand,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'How can I help you understand this topic better?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollViewportRef.current) {
      const scrollElement = scrollViewportRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
    onExpand?.(isExpanded);
  }, [isExpanded, onExpand]);

  const handleSend = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = message.trim();
      setMessage('');
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
      setIsLoading(true);

      try {
        const client = new MistralClient('0A01OnWpKQWWjB2HnpW8BvKqFf4pGMFf');
        const contextPrompt = currentPageDescription
          ? `Context: ${currentPageDescription}\n\nQuestion: ${userMessage}`
          : userMessage;

        const result = await client.chatStream({
          model: 'mistral-small',
          messages: [{ role: 'user', content: contextPrompt }],
        });

        let streamedResponse = '';
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        for await (const chunk of result) {
          const streamText = chunk.choices[0].delta.content;
          if (streamText) {
            streamedResponse += streamText;
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].content = streamedResponse;
              return newMessages;
            });
          }
        }
      } catch (error) {
        console.error('Error calling Mistral API:', error);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'I apologize, but I encountered an error. Please try again.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className={cn(
        'flex-1 chat-card rounded-xl flex flex-col transition-all duration-300 ease-in-out relative z-10',
        isExpanded ? 'scale-110 shadow-2xl' : 'hover:scale-105',
        'transform-gpu'
      )}
      style={{
        transformOrigin: 'bottom right',
        height: isExpanded ? 'calc(100vh - 16rem)' : 'calc(100vh - 24rem)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div className="border-b border-[#232425]/10 px-2 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-[#232425]" />
          <h2 className="font-semibold text-[#232425]">Ask AvA</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-[#232425]/10"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4 text-[#232425]" />
          ) : (
            <Maximize2 className="h-4 w-4 text-[#232425]" />
          )}
        </Button>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-[#232425]/10 scrollbar-track-transparent"
        ref={scrollViewportRef}
      >
        <div className="p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-2 transition-all duration-300',
                msg.role === 'assistant' ? 'opacity-90 hover:opacity-100' : ''
              )}
            >
              {msg.role === 'assistant' && (
                <Bot className="h-8 w-8 rounded-full bg-[#232425]/10 p-1.5 text-[#232425] shrink-0" />
              )}
              <div
                className={cn(
                  'rounded-lg p-3 transition-all duration-300',
                  msg.role === 'assistant'
                    ? 'bg-white/50 shadow-sm max-w-[85%] hover:bg-white/70'
                    : 'bg-[#232425] text-white ml-auto max-w-[85%] hover:bg-[#232425]/90'
                )}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t border-[#232425]/10 p-4 bg-[#D6EDD9] rounded-b-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isExpanded
                ? 'Ask anything about the current topic...'
                : 'Type your message...'
            }
            disabled={isLoading}
            className={cn(
              'flex-1 rounded-lg border border-[#232425]/10 bg-white/50 px-3 py-2 text-sm shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-[#232425]/20',
              'placeholder:text-[#232425]/40',
              'transition-all duration-300'
            )}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading}
            className={cn(
              'shrink-0 bg-[#232425] text-white hover:bg-[#232425]/90',
              'transition-all duration-300',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
