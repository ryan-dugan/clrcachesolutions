---
description: defines the behavior of cards on hover animation as well as general styling
---

Below is an example of a card with this styling that should be applied.

The card features an icon, a header text and a body text. It is a dark background with white lettering and purple accents (purple for the icon).
On hover, the card gets bigger, a purple top outline moves across the top of the card, and the card background changes to a gradient.

                        <div class="feature-card bg-base-light/50 backdrop-blur-sm border border-base-light/30 p-8 rounded-2xl shadow-lg transition-all duration-300">
                            <div class="flex-shrink-0 mb-4">
                                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                                </div>
                            </div>
                            <h4 class="text-lg font-bold text-off-white">1. Speed = Retention + SEO</h4>
                            <p class="mt-2 text-text-medium">53% of users will leave a website if it takes longer than 3 seconds to load. Template builders are bloated with unnecessary code, making them slower than lean, custom-built sites. Faster sites also rank better in Google.</p>
                        </div>