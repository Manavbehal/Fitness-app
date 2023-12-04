import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (newMessages = []) => {
    try {
      const YOUR_CHATGPT_API_KEY = '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';
      const userMessage = newMessages[0];
      setMessages((previousMessages) => GiftedChat.append(previousMessages, userMessage));
      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        'Diet',
        'exercise',
        'Workout plan',
        'Workout',
        'Bmi',
        'Gym Motivation',
        'GYM',
        'weight',
        'Strength training',
        'Cardio',
        'Nutrition',
        'Healthy eating',
        'Muscle building',
        'Fat loss',
        'Fitness routine',
        'Bodyweight exercises',
        'CrossFit',
        'Yoga',
        'Physical health',
        'Mental health',
        'Wellness',
        'Personal training',
        'Fitness tips',
        'Exercise equipment',
        'Supplements',
        'Recovery',
        'Flexibility',
        'Endurance',
        'HIIT',
        'Calories',
        'Protein intake',
        'Hydration',
        'Rest days',
        'Gym attire',
        'Fitness goals',
        'Motivational quotes',
        'Weightlifting',
        'Body composition',
      ];
      
  
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `Provide information on ${messageText} in the context of gym and fitness.`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
          },
        }
      );
  
      if (!response.data.choices || response.data.choices.length === 0) {
        const defaultBotMessage = {
          _id: new Date().getTime() + 2,
          text: 'I am sorry, but I could not find any information for your request.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Gym Bot',
          },
        };
        setMessages((previousMessages) => GiftedChat.append(previousMessages, defaultBotMessage));
        return;
      }
  
      const recipe = response.data.choices[0].text.trim();
      const hasKeyword = keywords.some((keyword) => messageText.includes(keyword.toLowerCase()));
  
      if (!hasKeyword) {
        const defaultBotMessage = {
          _id: new Date().getTime() + 3,
          text: 'I am your Fitness Bot, ask me any information related to gym and fitness.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Gym Bot',
          },
        };
        setMessages((previousMessages) => GiftedChat.append(previousMessages, defaultBotMessage));
        return;
      }
  
      const keywordResponse = `Here's some information about ${keywords[0]}: ${recipe}`; // Adjust the index as needed
      const botMessage = {
        _id: new Date().getTime() + 2,
        text: keywordResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Gym Bot',
        },
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#F5F5F5',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
        }}>
          Gym Bot
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
};

export default ChatBot;
