---
date: 2025-02-15
title: "Setting Up Cursor with Local LLMs"
tags: [cursor, llm]
socialDescription: "Setting Up Cursor with Local LLMs: A Step-By-Step Guide"
socialImage: ""
---


If you're looking to integrate local LLMs with Cursor, you've come to the right place! This guide will walk you through the process of setting up Ollama alongside Cursor for seamless local model usage - a solution that's both powerful and privacy-focused.

## Prerequisites

Before we dive in, you'll need two essential tools:
- Ollama - Your local LLM server
- Ngrok - For free and secure tunneling

## Getting Started

First, head over to [Ollama's website](https://ollama.com/download) and download the latest version. While that's installing, grab Ngrok from their [download page](https://ngrok.com/download) after creating a free account.

## Setting Up Ollama

Now, let's start by pulling the deepseek-r1 model. Open your terminal and run:

```bash
ollama pull deepseek-r1
```

Once downloaded, fire up the Ollama server in the background:

```bash
OLLAMA_ORIGINS=* ollama serve > /dev/null 2>&1 &
```

## Creating a Secure Tunnel with Ngrok

Now for the interesting part - we'll use Ngrok to create a secure tunnel to your local Ollama server:

```bash
ngrok http 11434 --domain=ollama.ngrok.app
```

**Security Note**: Keep your Ngrok URL private! If it ever gets compromised, simply restart the Ngrok server to generate a new URL.

## Configuring Cursor

Here's where everything comes together:

1. Copy your Ngrok URL

![NGrok tunnel url](static/notes/ngrok-url.png)

2. Open Cursor settings, find the OpenAI Base URL field. Paste your Ngrok URL and append `/v1` (e.g., `https://ollama.ngrok.app/v1`)
![Cursor settings](static/notes/cusor-settings.png)

3. In the model menu, add your model name (in this case, `deepseek-r1`) and select the model. Ensure the name of the model is the same as the Ollama image name.
4. Set the OpenAI key to `ollama`

And voilà! You're now running Cursor with your very own local LLM. No more dependency on cloud services, complete control over your AI environment, and better privacy - what's not to love?

Remember, local LLMs might not be as powerful as their cloud counterparts, but they offer unmatched privacy and customization options. Perfect for development, testing, or when you need to work offline.

While this guide helps you set up local LLMs with Cursor, please note that the Cursor Tab functionality will not work with this setup. The Cursor Tab uses Cursor's own custom model and is exclusively available as part of their Pro features. This integration only works with the command palette and other basic AI features.

Happy building! 🚀