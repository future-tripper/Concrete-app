# CONCRETE

**Borrowed Gravitas Detector** - Analyzes LinkedIn posts for AI-generated "vapor" and helps users either ground their writing in specifics or fully commit to the abstraction.

## Project Overview

CONCRETE detects when writing borrows prestige from high-status domains to make ordinary things sound profound. It identifies 4 types of borrowed gravitas:

- **Scientific**: Physics/neuroscience language (coherence, entropy, resonance, signal)
- **Systems**: Engineering/architecture language (ecosystem, framework, stack, layers)
- **Wisdom**: Spirituality/philosophy language (presence, embodied, consciousness, grounded)
- **Action**: Consulting/transformation language (unlock, scale, optimize, transform)

## Tech Stack

- **Frontend**: Streamlit
- **AI**: Anthropic Claude API (claude-sonnet-4-20250514)
- **Language**: Python 3.x

## Key Files

- `app.py` - Main Streamlit application
- `Reference-docs/` - Obsidian notes with project context and data samples
- `linkedin-launch/` - Launch content and posts

## Running the App

```bash
# Install dependencies
pip install streamlit anthropic st-annotated-text

# Set API key
export ANTHROPIC_API_KEY="your-key-here"

# Run
streamlit run app.py
```

## App Flow

1. **Input**: User pastes LinkedIn draft
2. **Analysis**: Claude analyzes for gravitas composition, altitude level, and grounding
3. **Choice**: User picks a path:
   - **Ground It**: Get questions to anchor abstractions in specifics
   - **Own It**: Push the elevation to full manifesto/prophecy mode
   - **Elevate It**: (for already grounded posts) Add gravitas while keeping specifics

## Altitude Levels

- `grounded` - Clear, anchored to specifics
- `moderate` - Some elevation, partially anchored
- `high` - Significant vapor, floating abstractions
- `stratospheric` - Pure vapor, abstraction all the way down

## Cost Estimate

~$0.025 per full use (analyze + rewrite) using Sonnet pricing.

## Development Notes

- The prompts in `app.py` are the core IP - they define the gravitas taxonomy and rewrite strategies
- JSON output from analysis must be robustly parsed (Claude sometimes wraps in markdown)
- Session state manages the 3-step flow (input -> analysis -> rewrite)
