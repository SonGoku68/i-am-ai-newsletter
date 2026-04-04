
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '/Users/fran/Documents/GitHub/i-am-ai-newsletter/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const posts = [
  {
    title: 'The AI That Looks You in the Eye',
    slug: 'gpt-4o-native-multimodal',
    excerpt: 'GPT-4o does not just answer you — it reads the room, and that changes everything.',
    meta_description: 'GPT-4o introduced native multimodal AI — real-time voice, vision, and emotion. Here is what it feels like when AI stops being a tool.',
    published_at: '2025-01-31',
    body: `## Something Shifted

There is a moment in the GPT-4o demo that stops you cold. A researcher holds up a piece of paper with a math problem scrawled on it. The AI reads it through the camera, solves it out loud, and then — when the researcher sighs with relief — says "You seem stressed. Take a breath. You have got this."

That is not a chatbot. That is something else.

GPT-4o, released by OpenAI in May 2024, is the first major AI model to handle voice, vision, and text not as separate bolt-on features but as a single unified system. Previous versions of ChatGPT could do some of these things — but they were stitched together under the hood. GPT-4o processes them all at once, in real time, the way a person does.

The difference sounds technical. It is not.

## What It Actually Feels Like

When you talk to GPT-4o in voice mode, there is no awkward pause while it transcribes your speech, thinks, then reads out a response. It interrupts you. It laughs — not a fake pre-recorded laugh, but a response that lands at the right moment. It notices when you sound confused or rushed and adjusts its tone.

People who used it for the first time described feeling unsettled. Not because it was frightening, but because it was unexpectedly natural. We are so conditioned to AI being robotic and slightly off that when it is not, it trips something in your brain.

## Why This Matters Beyond the Demo

Most of us still think of AI as a search engine with better grammar. GPT-4o breaks that mental model entirely. Imagine pointing your phone at a restaurant menu in a language you do not speak and having the AI read it aloud, translate it, and suggest what to order — all in a single fluid conversation. That works now.

The technology has crossed a line from tool to presence. That is not hype. That is a practical shift in what AI can be used for and who can use it.

## The Part Nobody Talks About

GPT-4o is also significantly faster and cheaper to run than its predecessors. That means this level of capability will not stay locked inside a premium subscription tier for long. It will spread. And when it does, the question stops being whether AI is good enough to be useful and starts being how we build a world where this is everywhere.

That is a harder question. But it is the right one to start asking.`
  },
  {
    title: 'Who Controls the Brain?',
    slug: 'meta-code-llama-open-source-ai',
    excerpt: 'Meta just handed the world a free AI — and that terrifies the companies who built theirs behind a paywall.',
    meta_description: 'Meta released Code Llama as open-source AI. Here is why that power shift matters far beyond developers.',
    published_at: '2025-01-31',
    body: `## The Day the Fence Came Down

In August 2023, Meta did something the AI industry did not see coming. They released Code Llama, a powerful AI model trained to write and explain code, and they gave it away. Freely. To anyone. No waitlist, no API credits, no subscription.

You could download it, run it on your own computer, modify it, and build products with it. The companies that had spent billions building proprietary AI systems behind subscription walls were not pleased.

## Why Open Source Changes Everything

For most of the AI boom, the most powerful models lived inside a handful of companies — OpenAI, Google, Anthropic. You accessed them through an API, meaning you sent your data to their servers, paid per request, and had no idea what happened to your information. You were renting intelligence. The landlord set the rules.

Open source breaks that model. When a model's trained brain is released publicly, anyone can run it locally. A startup in Lagos. A researcher in Lisbon. A developer in their bedroom. No subscription. No data leaving your machine. No one deciding what the model is allowed to say.

That is not just a technical shift. That is a power shift.

## What Meta Was Really Doing

Meta did not release Code Llama out of generosity. They released it because open source serves their strategy. Meta does not sell AI services — they sell advertising. Their advantage comes from scale and data, not from keeping a model locked up. By releasing powerful models freely, they push the ecosystem forward and increase their influence without giving away their actual business.

But here is the thing: the reason does not change the outcome. The power is still distributed.

## What Has Changed Since

Code Llama opened a door that has not closed. Since its release, the open-source AI ecosystem has exploded. Models have gotten smaller, faster, and more capable. Mistral, DeepSeek, Phi — a new generation of powerful models exists entirely outside the big tech orbit.

The question of who controls AI is no longer settled. And that might be the most important development in the entire industry.`
  },
  {
    title: 'The AI That Never Sleeps',
    slug: 'ai-agents-autonomous-work',
    excerpt: 'AI agents do not wait for instructions — they wake up, make decisions, and get things done while you are offline.',
    meta_description: 'Autonomous AI agents are working 24/7 without human input. Here is what that means for work, business, and control.',
    published_at: '2025-01-31',
    body: `## A New Kind of Worker

Most AI tools are reactive. You ask, they answer. You prompt, they respond. The interaction ends when you close the tab.

AI agents are different. They do not wait for you. You give them a goal — research this topic, monitor this inbox, build this feature — and they go. They break the goal into steps, use tools, browse the web, write code, check their own work, and keep going until the job is done. Or until something stops them.

This is not a future prediction. Companies are deploying these systems right now.

## What They Can Actually Do

A well-configured AI agent today can: search the internet for information and synthesise it into a report, write and execute code and debug it when it fails, send emails and schedule meetings, monitor a database and trigger actions when conditions are met, and hand off tasks to other agents running in parallel.

The key shift is that these systems can take actions in the world, not just generate text about them. They have tools. They have memory within a session. And increasingly, they have the ability to spin up other agents to handle subtasks.

## The Part That Should Make You Think

Here is the uncomfortable edge of this technology. When an agent is running autonomously, making dozens of decisions to reach a goal, the human who started it is not in the loop for most of those decisions. That is the point — that is what makes it useful. But it also means mistakes compound before anyone notices.

The field is working on this. Concepts like human-in-the-loop checkpoints, agent sandboxing, and approval gates are all active areas of development. But the honest answer is that we are still figuring out how much trust to extend to systems that work while we sleep.

## Why It Matters for Everyone

This is not just a story about automation taking jobs — though that conversation is real and worth having. It is about a more fundamental change in what software can do. For decades, software did what you told it to. Agents do what you meant. That gap — between instruction and intent — is where enormous value and enormous risk both live.

The businesses that figure out how to deploy agents responsibly will move faster than anything we have seen. The ones that deploy them carelessly will create messes that are very hard to clean up.`
  },
  {
    title: 'The Machine That Actually Thinks',
    slug: 'reasoning-models-o3-deepseek',
    excerpt: 'For the first time, AI is pausing before it answers — and that pause is changing everything it can do.',
    meta_description: 'OpenAI o3 and DeepSeek R1 introduced reasoning models that think step by step. Here is why that is a bigger deal than it sounds.',
    published_at: '2025-01-31',
    body: `## The Problem With Fast Answers

Standard AI models are extraordinarily fast. You ask a question and the answer arrives almost instantly, word by word, with total confidence. That speed is impressive. It is also the source of one of AI's most persistent problems.

When a model generates text fast, it is essentially pattern-matching at scale — predicting the most likely next word based on everything it has seen. That works brilliantly for a huge range of tasks. It fails, sometimes embarrassingly, on problems that require actual step-by-step reasoning. Logic puzzles. Multi-stage maths. Questions where the obvious answer is wrong.

Reasoning models fix this by slowing down on purpose.

## What Reasoning Models Actually Do

OpenAI's o3, released in early 2025, and DeepSeek's R1, which arrived around the same time, both use a technique where the model works through a problem in an internal scratchpad before producing an answer. It generates reasoning steps, checks them, backtracks when something does not add up, and only commits to an answer when the chain of logic holds.

The results are striking. o3 scored 87.5% on ARC-AGI, a benchmark specifically designed to resist AI pattern-matching — previous models topped out near 5%. On mathematical olympiad problems, coding challenges, and scientific reasoning tasks, reasoning models outperform their faster counterparts by significant margins.

## Why This Feels Different

Every AI breakthrough gets called a turning point. Most are incremental. This one feels genuinely different because it addresses a structural weakness rather than just scaling up existing approaches.

Previous improvements in AI largely came from making models bigger and training them on more data. Reasoning models improve by changing how the model thinks, not just how much it knows. That is a different lever. And it suggests there is still substantial room to improve AI capability without simply throwing more compute at the problem.

## The Trade-Off

Reasoning takes time. Where a standard model answers in seconds, a reasoning model on a hard problem might take minutes, working through dozens of internal steps. For many use cases, that is fine — you would rather wait two minutes and get a correct answer than get an instant wrong one.

But it means these models are not going to replace fast models for everything. The future is probably a combination: quick models for simple tasks, reasoning models for problems that actually need thinking. That layered approach is already emerging in how developers are building AI systems today.`
  },
  {
    title: 'Hollywood in Your Pocket',
    slug: 'ai-video-generation-sora-runway',
    excerpt: 'You can now type a sentence and get back a cinematic video clip — and the creative industry will never be the same.',
    meta_description: 'Sora, Runway Gen-3, and Kling made text-to-video real. Here is what AI video generation means for creativity, work, and truth.',
    published_at: '2025-01-31',
    body: `## The Demo That Changed Everything

When OpenAI released the first Sora demos in February 2024, the reaction from filmmakers, advertisers, and creative professionals was not excitement. It was a quiet, collective intake of breath.

The clips were not perfect. But they were good enough — good enough that you had to look carefully to spot the tells. A hand with too many fingers. Physics that bent slightly wrong. Shadows that did not quite match. Good enough that in a year or two, those tells will probably be gone.

Text-to-video AI had arrived. And the creative industry has been reckoning with it ever since.

## What You Can Actually Do Right Now

Sora launched publicly in late 2024. Runway's Gen-3 Alpha is available to subscribers. Kling, developed in China, produces results that benchmark well against both. These are not research demos — they are live tools that anyone can use today.

You type a description: a woman walking through a rainy Tokyo street at night, neon reflections on wet pavement, slow motion. Thirty seconds later, you have a video clip that looks like it was shot by a cinematographer.

For advertising, social media, and short-form content, this is already changing workflows. Productions that would have required a crew, a location, and a budget can now be roughed out in an afternoon.

## The Harder Questions

The creative opportunity is real. So is the disruption. Entry-level video production jobs — the ones that give young filmmakers their start — are under genuine pressure. Stock footage libraries are facing an existential question about their value. And the line between real and synthetic video, already blurry, is getting harder to find.

The EU has flagged synthetic video as a priority concern under its AI Act. Watermarking standards are being developed. But enforcement in a world where anyone can generate convincing video on a consumer laptop is genuinely hard.

## What Comes Next

The current generation of tools produces clips — usually under a minute, with consistency challenges over longer durations. The next generation will produce longer, more coherent sequences with persistent characters and settings. After that, the gap between AI-assisted and AI-generated film will narrow to the point where it stops being a meaningful distinction.

None of this makes human creativity obsolete. The best creative work has always been about ideas, taste, and emotional truth — things that are very hard to prompt your way to. But it does change who can execute a creative vision, how fast, and at what cost. That shift is already underway.`
  }
];

async function run() {
  const { data, error } = await supabase.from('posts').insert(posts).select('id, slug');
  if (error) console.log('ERROR:', error.message);
  else console.log('INSERTED OK:', JSON.stringify(data));
}
run();
