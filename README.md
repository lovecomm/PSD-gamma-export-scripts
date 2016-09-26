# Photoshop scripts to assist in the development of Gamma (https://github.com/lovecomm/gamma) projects

## Setup
Within my Gamma project, I always put my PSD file in a `_creative` directory at the root of the Gamma project. If you choose to do something differently, be sure to edit the `dest*` variables within each script. Currently they are set to export files and put them right into the `/assets/**` directories at the root level of the Gamma project.

## Artboard Previews
Use this script to export all artboards (or top level groups) from photoshop as PNG files.

## Gamma Layers
Use this script to export all layers (and static-backups/failovers) for each banners.
* To properly export layers, follow the Gamma layer naming convention `concept-size-layername`, but add a `.png` or `.jpg` at the end of the file name to indicate to the script it's to be exported. Example: `fiber-300x600-logo.png`.
* To properly export an artboard as the static-backup/faliover, name it as follows, `google-fiber-300x600-static.jpg` or `**.png`. 
* To ignore layers, simply put them in a group with the name NULL. Additionally, layers will be ignored if they are nested within a group that's being exported as a layer. For instance, if I have a CTA group with background and a text layers, and name the group `fiber-300x600-cta.png`, it will not export the nested layers. The only exception to this is when naming naming a layer for a static-backup/failover, like `google-fiber-300x600-static.jpg`, it will still export other named layers within that artboard.