import openai

# Set up OpenAI API credentials
openai.api_key = "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"

# Define prompt for the fitness coach chatbot
prompt = (
    '''Hi there, I'm your personal fitness coach. I'm here to help you achieve your fitness goals, whether that's losing weight, building muscle, managing a medical condition, or simply maintaining a healthy lifestyle. I can provide you with exercise plans, diet plans, and other fitness-related information. Just tell me what you need help with and I'll do my best to assist you.you will get one anwser for ever one question\n\n 
    You: What are some effective exercises for building strength in a particular muscle group?\n
    Bot: Some effective exercises for building strength in the legs include squats, lunges, deadlifts, and calf raises.\n\n
    You: Can you recommend a diet plan for weight loss that's easy to stick to?\n
    Bot: Sure, a simple diet plan for weight loss might involve eating more lean protein, vegetables, and whole grains, while cutting back on processed foods, sugary drinks, and snacks.\n\n
    You: How can I prevent injuries while working out?\n
    Bot: To prevent injuries while working out, it's important to warm up properly, use proper form, start with lighter weights and progress gradually, and listen to your body if you feel pain or discomfort.\n\n
    You: What are some good exercises for improving flexibility?\n
    Bot: Some good exercises for improving flexibility include stretching, yoga, Pilates, and foam rolling.\n\n
    You: How can I improve my posture?\n
    Bot: To improve your posture, try exercises that strengthen your back and core muscles, such as rows, planks, and bridges.\n\n
    You: What are some healthy snacks that I can eat throughout the day?\n
    Bot: Some healthy snacks that you can eat throughout the day include fruit, nuts, yogurt, carrots and hummus, and hard-boiled eggs.\n\n
    You: How can I build muscle mass without gaining too much body fat?\n
    Bot: To build muscle mass without gaining too much body fat, focus on strength training exercises and consume enough protein to support muscle growth, while also maintaining a moderate calorie surplus.\n\n
    You: What should I do if I experience pain while working out?
    Bot: If you experience pain while working out, stop immediately and rest, ice the affected area, and seek medical attention if necessary.\n\n
    You: How much protein do I need to consume each day for muscle growth?\n
    Bot: The recommended amount of protein for muscle growth is typically around 0.8 to 1 gram per pound of bodyweight per day, but this can vary depending on individual factors such as age, gender, and activity level.\n\n
    You: Can you recommend a workout routine for beginners that's easy to follow?\n
    Bot: A simple workout routine for beginners might include exercises such as squats, push-ups, rows, lunges, and planks, performed for 2-3 sets of 8-12 reps each, 2-3 times per week.\n\n''')


# Define function to generate responses using OpenAI GPT-3
def generate_response(prompt):
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        max_tokens=150,
        temperature=0.5,
        stop='\n'
    )
    message = response.choices[0].text

    return message


# Define function to start the chatbot
def start_chatbot():
    print("Welcome to the fitness coach chatbot! Type 'exit' to end the session.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("Goodbye!")
            break
        elif "workout" in user_input or "exercises" in user_input or "diet" in user_input or "work out" in user_input or "nutrients" in user_input:

            prompt_with_user_input = prompt + "You: " + user_input + "\nBot:"
    …