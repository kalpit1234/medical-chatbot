import React, { useState, useEffect, useRef } from 'react';
import { FaUserMd, FaUser, FaPaperPlane, FaMicrophone, FaSmile, FaSearch, FaPlus, FaTrash, FaHistory, FaStethoscope, FaNotesMedical, FaEdit, FaCopy, FaCheck, FaTimes, FaPause, FaPlay, FaRedo, FaShare, FaVolumeUp, FaVolumeMute, FaImage, FaTrashRestore } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import './App.css';

// Local GIF database for health conditions
const HEALTH_GIFS = {
  headache: [
    { id: 1, title: "Temple Rub", path: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3R6enVpNHZxbXVlODltMzhreHV6M3E0ZGpub2YxcGE4eGcwbGZmdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oXtzqqRi3S9Drua25e/giphy.gif" },
    { id: 2, title: "Headache Cartoon", path: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmZjNnlzM252d2k0aXBqaGllYXQyazA2a3FneXNvZjIycjdhMHpjdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1xkMucz3jc5AGB4elL/giphy.gif" },
    { id: 3, title: "Migraine Reaction", path: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWN0ZDAwNHBubjU2dndoNGZkMG9wb3BoaGRobHUxeGRpaG5hbnU1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Nvp7mgdnmUrieOcRKC/giphy.gif" },
  ],
  fever: [
    { id: 4, title: "Cold Pack", path: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTRhZ2ZwcWRlNnd3dzA4cDZnY2gxdGZ4NTV2bGVqMGwxbnhuZHQyaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jhWcFauCmhSHC/giphy.gif" },
    { id: 5, title: "Thermometer Check", path: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWw1MTJ5cW9tcmU2dWpwZ3plNXptanM2dWVraWZ5eXpuNTkxbm1wNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nU6r5gmwZijO3iNaDx/giphy.gif" },
    { id: 6, title: "Sick in Bed", path: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExODI0bGJzbnh5eDVsczU0ODBvOXk0azR6cXNvMjFheGYzM2V4Y2t3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dt01KgAjhAtny9AVox/giphy.gif" },
  ],
  cough: [
    { id: 7, title: "Cough Reaction", path: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3dxNHIydGU0M3pnZmZna2thbDY3ZGIxaDJxMnh0MHFwY2kzN2RiYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RK4otTwUX9qHn6sS3Y/giphy.gif" },
    { id: 8, title: "Cough & Tissue", path: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWlncmRwOXd5N29zN2hvYzl6NWR2dW96YW03Y3Q0aDlldG9ueDJiaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKsrfldgW9UXx60/giphy.gif" },
    { id: 9, title: "Throat Sore", path: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGRzaGt5eDFvbm9obmhob2s0ZzhhZzFvM2JuM3ptMjlhdGcxaDNhOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYwg9gvb34CDJyE/giphy.gif" },
  ],
  stomach: [
    { id: 10, title: "Stomach Ache", path: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazR6MTZ5MWQ0cGphb2FoYXQyaHEzeDdsNmVjMTdoOTd3anN5dzgzMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FWENeXJjZrtucFSNzm/giphy.gif" },
    { id: 11, title: "Nausea Feeling", path: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExankwZ3hiZmU3MmcxNGFqNm5wanhzb2k4a2pmanBya3J4bmN6ZzlpMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbA04bftC063K/giphy.gif" },
    { id: 12, title: "Gut Pain", path: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmgzYmF4aG14cHZ5cTY1YnA4OTFmMzZ2dnVncjMwMDYyNTg3ZzVudyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dYmW6cqMRaY4CHBuH5/giphy.gif" },
  ],
  injury: [
    { id: 13, title: "Sprained Ankle", path: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGN1NHZ0OWdkenA4ZWNvMXc4dXltd2xiamZrNnp6ejY5cDgzMm53dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUNd9OEhDp9vhiRqJq/giphy.gif" },
    { id: 14, title: "Bandage Wound", path: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHc5NmV4NDAxMTRpM3dteGR5OWlhb2lxcG4yd2dpYmZhdzduZm9pciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sL8HDXItie3CM/giphy.gif" },
    { id: 15, title: "Ouch", path: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnYzMGhuN3U1bjdxdzU5ZGV5NXVicGkwcHc5dmo1Y25ybmlrcTZ6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwlN2fU4oFDgkk8/giphy.gif" },
  ],
  general: [
    { id: 16, title: "Drink Water", path: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTZlY3RiMmM5eHZ1MXJic25wbXkyaHN1NWgwemlyMHo3N2thcmxtcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/guKp5Wjf2N2Lu/giphy.gif" },
    { id: 17, title: "Rest in Bed", path: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjBxaHBoMDB4OGk1emEyNXM3MzJvY2V3bDBrcWlzbmtlamhlMGxtMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KD8Ldwzx90X9hi9QHW/giphy.gif" },
    { id: 18, title: "Healthy Reminder", path: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHY3anZ3OGM5bDl2ODMyMHJmaW1tYnZoYmxyN2xraDNieWlwMDFnbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lnf4Z1BAPAZMlGbH15/giphy.gif" },
  ],
};


const App = () => {
  const [messages, setMessages] = useState([
    { id: Date.now(), sender: 'bot', text: 'Hello 👋! I am your AI Medical Assistant. How can I help you today?' }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [trashHistory, setTrashHistory] = useState([]); // New state for trash
  const [activeChatId, setActiveChatId] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceAssistantEnabled, setVoiceAssistantEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakerIconPulse, setSpeakerIconPulse] = useState(false);
  const [showGifGallery, setShowGifGallery] = useState(false);
  const [gifCategory, setGifCategory] = useState('general');
  const [showTrash, setShowTrash] = useState(false); // New state to toggle trash view
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const voiceIntervalRef = useRef(null);
  const abortControllerRef = useRef(null);
  const [contextVersion, setContextVersion] = useState(0);
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  // Initialize speech synthesis
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    // Speak the initial message
    if (voiceAssistantEnabled) {
      speakText('Hello 👋! I am your AI Medical Assistant. How can I help you today?');
    }
    
    // Clean up on unmount
    return () => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Load chat history and trash on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setChatHistory(history);
      
      if (history.length > 0) {
        setActiveChatId(history[0].id);
        setMessages(history[0].messages);
      }
    }

    const savedTrash = localStorage.getItem('trashHistory');
    if (savedTrash) {
      setTrashHistory(JSON.parse(savedTrash));
    }
  }, []);

  // Save chat history and trash whenever they update
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    localStorage.setItem('trashHistory', JSON.stringify(trashHistory));
  }, [chatHistory, trashHistory]);

  // Speak text using Web Speech API with natural voice
  const speakText = (text) => {
    if (!voiceAssistantEnabled || !synthRef.current) return;
    
    // Cancel any ongoing speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    // Create new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    
    // Configure natural-sounding voice
    utteranceRef.current.rate = 0.95;
    utteranceRef.current.pitch = 1.1;
    utteranceRef.current.volume = 1.0;
    
    // Try to find a natural-sounding voice
    const voices = synthRef.current.getVoices();
    const naturalVoices = [
      'Google UK English Female',
      'Google UK English Male',
      'Microsoft David - English (United States)',
      'Microsoft Zira - English (United States)',
      'Samantha',
      'Daniel',
      'Karen',
      'Moira'
    ];
    
    const preferredVoice = voices.find(voice => 
      naturalVoices.includes(voice.name)
    );
    
    if (preferredVoice) {
      utteranceRef.current.voice = preferredVoice;
    } else if (voices.length > 0) {
      utteranceRef.current.voice = voices[0];
    }
    
    // Event handlers
    utteranceRef.current.onstart = () => {
      setIsSpeaking(true);
      setSpeakerIconPulse(true);
    };
    
    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
      setSpeakerIconPulse(false);
    };
    
    utteranceRef.current.onerror = (event) => {
      console.error('SpeechSynthesis Error:', event);
      setIsSpeaking(false);
      setSpeakerIconPulse(false);
    };
    
    // Speak the text
    synthRef.current.speak(utteranceRef.current);
  };

  // Stop ongoing speech
  const stopSpeech = () => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setSpeakerIconPulse(false);
    }
  };

  // Toggle voice assistant
  const toggleVoiceAssistant = () => {
    if (voiceAssistantEnabled && isSpeaking) {
      stopSpeech();
    }
    setVoiceAssistantEnabled(!voiceAssistantEnabled);
  };

  // Create a new chat session
  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Consultation',
      timestamp: new Date().toLocaleString(),
      messages: [
        { id: Date.now(), sender: 'bot', text: 'Hello 👋! I am your AI Medical Assistant. How can I help you today?' }
      ],
      isPaused: false,
      contextVersion: 0
    };
    
    setChatHistory(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setMessages(newChat.messages);
    setSearchTerm('');
    setEditingMessageId(null);
    setCopiedMessageId(null);
    setIsPaused(false);
    setContextVersion(0);
    
    // Speak the initial message
    if (voiceAssistantEnabled) {
      speakText('Hello 👋! I am your AI Medical Assistant. How can I help you today?');
    }
  };

  // Get current chat
  const getCurrentChat = () => {
    return chatHistory.find(chat => chat.id === activeChatId);
  };

  // Switch to a different chat session
  const switchChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setActiveChatId(chatId);
      setMessages(chat.messages);
      setEditingMessageId(null);
      setCopiedMessageId(null);
      setIsPaused(chat.isPaused || false);
      setContextVersion(chat.contextVersion || 0);
      
      // Stop any ongoing speech when switching chats
      if (voiceAssistantEnabled) {
        stopSpeech();
      }
    }
  };

  // Delete a chat session (move to trash)
  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    const chatToDelete = chatHistory.find(chat => chat.id === chatId);
    if (!chatToDelete) return;

    // Move to trash with deletion timestamp
    const deletedChat = {
      ...chatToDelete,
      deletedAt: new Date().toISOString()
    };
    
    // Update states
    setTrashHistory(prev => [deletedChat, ...prev]);
    const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
    setChatHistory(updatedHistory);
    
    if (chatId === activeChatId && updatedHistory.length > 0) {
      switchChat(updatedHistory[0].id);
    } else if (updatedHistory.length === 0) {
      createNewChat();
    }
  };

  // Restore a chat from trash
  const restoreChat = (chatId) => {
    const chatToRestore = trashHistory.find(chat => chat.id === chatId);
    if (!chatToRestore) return;

    // Remove from trash
    const updatedTrash = trashHistory.filter(chat => chat.id !== chatId);
    setTrashHistory(updatedTrash);

    // Add back to chat history
    const { deletedAt, ...restoredChat } = chatToRestore;
    setChatHistory(prev => [restoredChat, ...prev]);
    setActiveChatId(restoredChat.id);
    setMessages(restoredChat.messages);
  };

  // Permanently delete a chat from trash
  const deletePermanently = (chatId) => {
    const updatedTrash = trashHistory.filter(chat => chat.id !== chatId);
    setTrashHistory(updatedTrash);
  };

  // Empty the entire trash
  const emptyTrash = () => {
    setTrashHistory([]);
  };

  // Toggle pause state for the current chat
  const togglePauseChat = () => {
    const updatedHistory = chatHistory.map(chat => 
      chat.id === activeChatId ? { ...chat, isPaused: !isPaused } : chat
    );
    
    setChatHistory(updatedHistory);
    setIsPaused(!isPaused);
    
    // Stop speech when pausing chat
    if (isSpeaking) {
      stopSpeech();
    }
  };

  // Filter chat history based on search term
  const filteredChatHistory = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Filter trash history based on search term
  const filteredTrashHistory = trashHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle sending a message to your backend
  const handleSend = async (text = input, resendFromId = null, editedMessages = null) => {
    if ((!text.trim() && !resendFromId) || isPaused) return;
    
    let textToSend = text;
    let updatedMessages = editedMessages || messages;

    // If we're resending from a specific message
    if (resendFromId) {
      const messageToResend = updatedMessages.find(msg => msg.id === resendFromId);
      if (!messageToResend) return;
      textToSend = messageToResend.text;
    } else {
      // Normal send: create new user message
      const userMessage = { id: Date.now(), sender: 'user', text: textToSend };
      updatedMessages = [...updatedMessages, userMessage];
      setMessages(updatedMessages);
      setInput('');
    }

    // Update chat history
    const updatedChatHistory = chatHistory.map(chat => 
      chat.id === activeChatId 
        ? { ...chat, messages: updatedMessages } 
        : chat
    );
    
    setChatHistory(updatedChatHistory);
    
    setIsTyping(true);

    try {
      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();
      
      // Send message to your backend API
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: textToSend,
          contextVersion: getCurrentChat()?.contextVersion || 0
        }),
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      const botMessage = { 
        id: Date.now(), 
        sender: 'bot', 
        text: data.response,
        gif: getRelevantGif(data.response) // Add relevant GIF if available
      };
      
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      
      // Update chat history with bot response
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === activeChatId 
            ? { ...chat, messages: finalMessages } 
            : chat
        )
      );
      
      // Speak the bot response
      if (voiceAssistantEnabled) {
        speakText(data.response);
      }
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        const stopMessage = { 
          id: Date.now(),
          sender: 'bot', 
          text: 'Response generation stopped.' 
        };
        setMessages(prev => [...prev, stopMessage]);
        
        if (voiceAssistantEnabled) {
          speakText(stopMessage.text);
        }
      } else {
        console.error('Error:', error);
        const errorMessage = { 
          id: Date.now(),
          sender: 'bot', 
          text: 'Sorry, I encountered an error. Please try again later.' 
        };
        setMessages(prev => [...prev, errorMessage]);
        
        if (voiceAssistantEnabled) {
          speakText(errorMessage.text);
        }
      }
      
      // Update chat history with error message
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === activeChatId 
            ? { 
                ...chat, 
                messages: [...chat.messages, 
                  { 
                    id: Date.now(),
                    sender: 'bot', 
                    text: 'Sorry, I encountered an error. Please try again later.' 
                  }
                ] 
              } 
            : chat
        )
      );
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  // Get relevant GIF based on message content
  const getRelevantGif = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('headache') || lowerText.includes('migraine')) {
      const gifs = HEALTH_GIFS.headache;
      return gifs[Math.floor(Math.random() * gifs.length)];
    }
    if (lowerText.includes('fever') || lowerText.includes('temperature')) {
      const gifs = HEALTH_GIFS.fever;
      return gifs[Math.floor(Math.random() * gifs.length)];
    }
    if (lowerText.includes('cough') || lowerText.includes('throat')) {
      const gifs = HEALTH_GIFS.cough;
      return gifs[Math.floor(Math.random() * gifs.length)];
    }
    if (lowerText.includes('stomach') || lowerText.includes('nausea') || lowerText.includes('digest')) {
      const gifs = HEALTH_GIFS.stomach;
      return gifs[Math.floor(Math.random() * gifs.length)];
    }
    if (lowerText.includes('injury') || lowerText.includes('wound') || lowerText.includes('sprain')) {
      const gifs = HEALTH_GIFS.injury;
      return gifs[Math.floor(Math.random() * gifs.length)];
    }
    
    return null;
  };

  // Resend a message from history
  const resendMessage = (message) => {
    if (isPaused) return;
    
    // Find the position of this message in the conversation
    const messageIndex = messages.findIndex(msg => msg.id === message.id);
    
    // Create a new messages array truncated at this message
    const truncatedMessages = messages.slice(0, messageIndex + 1);
    setMessages(truncatedMessages);
    
    // Update chat history
    const updatedChatHistory = chatHistory.map(chat => 
      chat.id === activeChatId 
        ? { 
            ...chat, 
            messages: truncatedMessages,
            contextVersion: chat.contextVersion + 1
          } 
        : chat
    );
    
    setChatHistory(updatedChatHistory);
    setContextVersion(prev => prev + 1);
    
    // Resend the message to regenerate the conversation from this point
    handleSend(message.text, message.id, truncatedMessages);
  };

  // Stop the current request
  const stopCurrentRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Start editing a message
  const startEditing = (message) => {
    setEditingMessageId(message.id);
    setEditText(message.text);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  // Save edited message and update context
  const saveEditedMessage = () => {
    if (!editText.trim()) return;

    const messageIndex = messages.findIndex(msg => msg.id === editingMessageId);
    if (messageIndex === -1) return;

    // Create a new array with the edited message and remove all subsequent messages
    const updatedMessages = [
      ...messages.slice(0, messageIndex),
      {
        ...messages[messageIndex],
        text: editText
      }
    ];

    setMessages(updatedMessages);

    const updatedChatHistory = chatHistory.map(chat =>
      chat.id === activeChatId
        ? {
            ...chat,
            messages: updatedMessages,
            contextVersion: chat.contextVersion + 1
          }
        : chat
    );

    setChatHistory(updatedChatHistory);
    setContextVersion(prev => prev + 1);

    setEditingMessageId(null);
    setEditText('');

    // Get the edited message from the updated array
    const editedMessage = updatedMessages[messageIndex];
    if (editedMessage.sender === 'user') {
      handleSend(editText, editedMessage.id, updatedMessages);
    }
  };
  // Regenerate the last response
  const regenerateResponse = () => {
    // Find the last user message
    const lastUserMessageIndex = messages
      .map((msg, index) => ({ msg, index }))
      .filter(({ msg }) => msg.sender === 'user')
      .pop()?.index;
    
    if (lastUserMessageIndex === undefined) return;
    
    // Truncate messages to before the last bot response
    const truncatedMessages = messages.slice(0, lastUserMessageIndex + 1);
    setMessages(truncatedMessages);
    
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === activeChatId 
          ? { 
              ...chat, 
              messages: truncatedMessages,
              contextVersion: chat.contextVersion + 1
            } 
          : chat
      )
    );
    
    // Resend the last user message
    handleSend(truncatedMessages[lastUserMessageIndex].text, null, truncatedMessages);
  };

  // Copy message to clipboard
  const copyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(Date.now());
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingMessageId) {
        saveEditedMessage();
      } else {
        handleSend();
      }
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInput(prevInput => prevInput + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Start voice recognition with visual feedback
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) || isPaused) {
      alert('Speech Recognition is not supported in this browser or chat is paused.');
      return;
    }
    
    setIsListening(true);
    
    // Simulate voice level changes
    voiceIntervalRef.current = setInterval(() => {
      setVoiceLevel(Math.floor(Math.random() * 100) + 20);
    }, 100);
    
    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      stopVoiceAnimation();
      
      // Speak the user's question for confirmation
      if (voiceAssistantEnabled) {
        speakText(`You asked: ${transcript}`);
      }
      
      // Auto-send the question after a short delay
      setTimeout(() => {
        handleSend(transcript);
      }, 1000);
    };
    
    recognition.onend = () => {
      stopVoiceAnimation();
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      stopVoiceAnimation();
      
      if (voiceAssistantEnabled) {
        speakText("I'm having trouble understanding your voice. Could you please type your question?");
      }
    };
  };

  // Stop voice animation
  const stopVoiceAnimation = () => {
    setIsListening(false);
    setVoiceLevel(0);
    if (voiceIntervalRef.current) {
      clearInterval(voiceIntervalRef.current);
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Auto scroll to the bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Toggle GIF gallery
  const toggleGifGallery = () => {
    setShowGifGallery(!showGifGallery);
    if (showEmojiPicker) setShowEmojiPicker(false);
  };

  // Insert GIF into message
  const insertGif = (gif) => {
    setInput(prev => `${prev} [GIF:${gif.title}]`);
    setShowGifGallery(false);
  };

  // Format date for trash items
  const formatDeletedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="app-container">
      {/* Dashboard Sidebar */}
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="brand">
            <FaStethoscope className="brand-icon" />
            <h1>MediChat</h1>
          </div>
          <p className="tagline">Your AI-Powered Medical Assistant</p>
        </div>
        
        <div className="dashboard-actions">
          <motion.button 
            className="new-chat-btn"
            onClick={createNewChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> New Consultation
          </motion.button>
          
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search consultations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="trash-controls">
          <motion.button
            className={`trash-toggle-btn ${showTrash ? 'active' : ''}`}
            onClick={() => setShowTrash(!showTrash)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTrash /> {showTrash ? 'Hide Trash' : 'View Trash'} 
            {trashHistory.length > 0 && (
              <span className="trash-count">{trashHistory.length}</span>
            )}
          </motion.button>
          
          {showTrash && trashHistory.length > 0 && (
            <motion.button
              className="empty-trash-btn"
              onClick={emptyTrash}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Empty Trash
            </motion.button>
          )}
        </div>
        
        <div className="chat-history">
          <div className="section-header">
            <FaHistory className="section-icon" />
            <h3>{showTrash ? 'Trash' : 'Consultation History'}</h3>
          </div>
          
          <div className="history-list">
            {showTrash ? (
              filteredTrashHistory.length > 0 ? (
                filteredTrashHistory.map((chat) => (
                  <motion.div
                    key={chat.id}
                    className={`history-item trash-item`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="item-icon">
                      <FaTrash />
                    </div>
                    <div className="item-content">
                      <div className="item-title">
                        {chat.title}
                        <div className="deleted-date">
                          Deleted: {formatDeletedDate(chat.deletedAt)}
                        </div>
                      </div>
                      <div className="item-date">{chat.timestamp}</div>
                    </div>
                    <div className="trash-actions">
                      <motion.button
                        className="restore-btn"
                        onClick={() => restoreChat(chat.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Restore chat"
                      >
                        <FaTrashRestore />
                      </motion.button>
                      <motion.button
                        className="delete-permanently-btn"
                        onClick={() => deletePermanently(chat.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete permanently"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="empty-history">
                  Trash is empty. Deleted consultations will appear here.
                </div>
              )
            ) : (
              filteredChatHistory.length > 0 ? (
                filteredChatHistory.map((chat) => (
                  <motion.div
                    key={chat.id}
                    className={`history-item ${activeChatId === chat.id ? 'active' : ''}`}
                    onClick={() => switchChat(chat.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="item-icon">
                      <FaNotesMedical />
                      {chat.isPaused && (
                        <div className="pause-indicator" title="Paused">
                          <FaPause />
                        </div>
                      )}
                    </div>
                    <div className="item-content">
                      <div className="item-title">
                        {chat.title}
                        {chat.isPaused && <span className="paused-tag">Paused</span>}
                        {chat.contextVersion > 0 && <span className="context-tag">Edited</span>}
                      </div>
                      <div className="item-date">{chat.timestamp}</div>
                    </div>
                    <motion.button
                      className="delete-btn"
                      onClick={(e) => deleteChat(chat.id, e)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                <div className="empty-history">
                  No consultation history found. Start a new conversation!
                </div>
              )
            )}
          </div>
        </div>
        
        <div className="dashboard-footer">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>System Operational</span>
          </div>
          <p className="copyright">© 2025 MediChat AI. All rights reserved.</p>
        </div>
      </div>

      {/* Chatbot Container */}
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="header-info">
            <FaUserMd className="header-icon" />
            <span>AI Medical Assistant</span>
            {isPaused && <span className="paused-indicator">(Paused)</span>}
            {contextVersion > 0 && <span className="context-indicator">(Context Updated)</span>}
          </div>
          <div className="header-controls">
            <div className="status-indicator">● Online</div>
            <motion.button
              className={`voice-btn ${voiceAssistantEnabled ? 'active' : ''}`}
              onClick={toggleVoiceAssistant}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={voiceAssistantEnabled ? "Disable Voice Assistant" : "Enable Voice Assistant"}
            >
              {voiceAssistantEnabled ? (
                <FaVolumeUp className={speakerIconPulse ? "pulse-icon" : ""} />
              ) : (
                <FaVolumeMute />
              )}
            </motion.button>
            <motion.button
              className="regenerate-btn"
              onClick={regenerateResponse}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Regenerate last response"
            >
              <FaRedo />
            </motion.button>
            <motion.button
              className={`pause-btn ${isPaused ? 'paused' : ''}`}
              onClick={togglePauseChat}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isPaused ? "Resume Chat" : "Pause Chat"}
            >
              {isPaused ? <FaPlay /> : <FaPause />}
            </motion.button>
          </div>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`chatbot-message ${msg.sender}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.sender === 'bot' ? 
                <FaUserMd className="message-icon bot" /> : 
                <FaUser className="message-icon user" />
              }
              
              <div className="message-content">
                {editingMessageId === msg.id ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="edit-buttons">
                      <button 
                        className="save-edit-btn"
                        onClick={saveEditedMessage}
                      >
                        <FaCheck />
                      </button>
                      <button 
                        className="cancel-edit-btn"
                        onClick={cancelEditing}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div 
                      className="message-text"
                      onClick={() => {
                        // Only make user messages clickable for resending
                        if (msg.sender === 'user') {
                          resendMessage(msg);
                        }
                      }}
                    >
                      {msg.text}
                      {msg.sender === 'user' && (
                        <div className="resend-hint">
                          Click to resend and continue from here
                        </div>
                      )}
                    </div>
                    
                    {/* Display GIF if available */}
                    {msg.gif && (
                      <div className="message-gif">
                        <img src={msg.gif.path} alt={msg.gif.title} />
                        <div className="gif-title">{msg.gif.title}</div>
                      </div>
                    )}
                    
                    <div className="message-actions">
                      {msg.sender === 'user' && (
                        <>
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => startEditing(msg)}
                            title="Edit message"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-btn resend-btn"
                            onClick={() => resendMessage(msg)}
                            title="Resend this message"
                          >
                            <FaShare />
                          </button>
                        </>
                      )}
                      <button 
                        className="action-btn copy-btn"
                        onClick={() => copyMessage(msg.text)}
                        title="Copy message"
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
          
          {copiedMessageId && (
            <motion.div 
              className="copied-notification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              Message copied to clipboard!
            </motion.div>
          )}
          
          {isTyping && (
            <div className="typing-indicator">
              <span></span><span></span><span></span>
              <button 
                className="stop-generating-btn"
                onClick={stopCurrentRequest}
              >
                Stop Generating
              </button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chatbot-input">
          <FaSmile     
            className="input-icon" 
            onClick={toggleEmojiPicker} 
            disabled={isPaused}
          />
          
          {showEmojiPicker && (
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          
          <FaImage 
            className={`input-icon ${showGifGallery ? 'active' : ''}`} 
            onClick={toggleGifGallery} 
            disabled={isPaused}
          />
          
          {showGifGallery && (
            <div className="gif-gallery">
              <div className="gif-categories">
                {Object.keys(HEALTH_GIFS).map(category => (
                  <button
                    key={category}
                    className={`gif-category-btn ${gifCategory === category ? 'active' : ''}`}
                    onClick={() => setGifCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              <div className="gif-grid">
                {HEALTH_GIFS[gifCategory].map(gif => (
                  <div 
                    key={gif.id} 
                    className="gif-item"
                    onClick={() => insertGif(gif)}
                  >
                    <img src={gif.path} alt={gif.title} />
                    <div className="gif-title">{gif.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <input
            type="text"
            placeholder={isPaused ? "Chat is paused - resume to continue" : "Describe your symptoms or ask a medical question..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isPaused}
          />
          
          <div className="voice-container">
            <FaMicrophone 
              className={`input-icon ${isListening ? 'active' : ''}`} 
              onClick={isListening ? stopVoiceAnimation : startListening} 
              disabled={isPaused}
              title={isListening ? "Stop listening" : "Start voice input"}
            />
            {isListening && (
              <div className="voice-wave">
                <div className="wave-bar" style={{ height: `${voiceLevel * 0.5}%` }}></div>
                <div className="wave-bar" style={{ height: `${voiceLevel * 0.7}%` }}></div>
                <div className="wave-bar" style={{ height: `${voiceLevel}%` }}></div>
                <div className="wave-bar" style={{ height: `${voiceLevel * 0.7}%` }}></div>
                <div className="wave-bar" style={{ height: `${voiceLevel * 0.5}%` }}></div>
                <div className="wave-bar" style={{ height: `${voiceLevel * 0.8}%` }}></div>
                <div className="wave-bar" style={{ height: `${voiceLevel}%` }}></div>
                <div className="wave-bar" style={{ height: `${voiceLevel * 0.8}%` }}></div>
              </div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSend()}
            disabled={isPaused || !input.trim()}
          >
            <FaPaperPlane />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default App;
