# JS30 Widgets - @aliaksandr-kiziankou

Pull Request: https://github.com/RSS-Js-FE-BootCamp/js30-widgets/pull/123

Pull Request: https://github.com/RSS-Js-FE-BootCamp/js30-widgets/pull/322

## What was implemented

### Drum Kit

- [x] Reproduced the original widget
- [x] Implemented the mandatory feature: sound plays both on keyboard keypress and on mouse click on the corresponding on-screen pad.
- [x] Optional improvement:
* **Multiple instruments** - switching the instrument swaps the set of sounds played by the same pads (drums, sapler and meme sounds).
* **Playback beats & melodies block.** Here you can select one of 3 drum tracks to play along with a melody on the sampler (like in '90s hip-hop), or you can select a melody (also 3 to choose from) to play the drums along with.)
* **Cut Switch.** Based on its value, it mimics the dark/light theme toggle in the task settings. It persists across reloads. However, its purpose is to cut off the current sound when a new one is played, so that the samples don't overlap (it's indispensable when playing on a sampler). It also operates independently; its effect does not extend to the Playback beats & melodies block.
* **Legend switch.** It shows/hides usefull tooltips for the site's tools and features.

### JS Clock

- [x] Reproduced the original widget
- [x] Implemented the mandatory feature: Extend the app with a digital clock panel displayed next to the analog face
- [x] Optional improvement:
* A multi-timezone view showing time at several cities of the world simultaneously.
* An online alarm clock with sound and dismiss/snooze controls.
* Dark / light theme toggle that persists across reloads.