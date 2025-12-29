**Claude Sonnet 4.5 pricing:**

- **$3 per million input tokens**
- **$15 per million output tokens**

**For CONCRETE, rough cost per use:**

Your prompts are ~1,500 tokens each. A typical LinkedIn post is ~200-400 tokens. Output is ~300-500 tokens.

**Analysis call:** ~2,000 input + ~400 output = ~$0.006 + ~$0.006 = **~$0.01**

**Rewrite call:** ~2,500 input + ~500 output = ~$0.008 + ~$0.008 = **~$0.016**

**Total per full use (analyze + one rewrite): ~$0.025** (2.5 cents)

So 1,000 users running full analysis + rewrite = ~$25.

**Cost saving options:**

- **Prompt caching:** If you cache the system prompts, you save 90% on those tokens after the first call
- **Batch API:** 50% off if you can wait 24 hours (not useful for interactive app)
- **Sonnet 4.5:** Same price, slightly smarter if you want to upgrade

At 2-3 cents per use, this is very affordable for a consumer tool.​​​​​​​​​​​​​​​​

---

Here’s how to add prompt caching to your code:

**The change:** Move your system prompt to the `system` parameter and add `cache_control`:

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "anthropic-version": "2023-06-01"
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" }  // ← This is the key
      }
    ],
    messages: [
      { 
        role: "user", 
        content: `Analyze this text:\n"${inputText}"` 
      }
    ],
  })
});
```

**What happens:**

|Call                         |Cost                    |
|-----------------------------|------------------------|
|First call                   |1.25x base (cache write)|
|Subsequent calls within 5 min|0.1x base (cache read)  |

**For CONCRETE specifically:**

Your system prompt is ~1,500 tokens, which meets the 1,024 token minimum for Sonnet.

- **First user:** ~$0.0056 for the prompt (1.25x)
- **Next users within 5 min:** ~$0.00045 for the prompt (0.1x)

If you get steady traffic, you’re saving ~90% on input tokens for the system prompt portion.

**One caveat:** The cache expires after 5 minutes of no hits. If you have sporadic traffic (users every 10+ minutes), you won’t benefit much. But if you have even a few users per hour during active periods, it adds up.​​​​​​​​​​​​​​​​