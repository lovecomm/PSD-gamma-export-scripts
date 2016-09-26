#target photoshop
// Export each static banner, and each image layer in preperation for a Gamma project (https://github.com/lovecomm/gamma)
var destLayers = new Folder(activeDocument.path + '/../assets/images/')
var destStatics = new Folder(activeDocument.path + '/../assets/static-banners/')
var doc = activeDocument;
if (!destLayers.exists) {
    destLayers.create();
}
if (!destStatics.exists) {
    destStatics.create();
}

(function getLayers(el) {
	// find layer groups
	 for (var a = 0; a < el.layerSets.length; a++) {
		 var lname = el.layerSets[a].name;
		 var ext = lname.substr(-4);
		 if (lname != 'Null' && lname != 'NULL' && lname != 'null') {
			  if (ext == ".png" || ext == '.jpg') {
					if (lname.substr(-10) == 'static' + ext) {
						saveLayer(el.layers.getByName(lname), lname, destStatics, ext, true);
						getLayers(el.layerSets[a]); // recursive
					} else {
						 saveLayer(el.layers.getByName(lname), lname, destLayers, ext, true);
					}
			 } else {
				 getLayers(el.layerSets[a]); // recursive
			 }
		 }
	 }
	 // find plain layers in current group whose names end with .png
	 for (var j = 0; j < el.artLayers.length; j++) {
		 var name = el.artLayers[j].name;
		 var ext = name.substr(-4);
		 if (ext == ".png" || ext == '.jpg') {
				 saveLayer(el.layers.getByName(name), name, destLayers, ext, false);
		 }
	 }
})(doc)

function saveLayer(layer, lname, path, ext, shouldMerge) {
  activeDocument.activeLayer = layer;
  dupLayers();
  if (shouldMerge === undefined || shouldMerge === true) {
    activeDocument.mergeVisibleLayers();
  }
  activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
  var saveFile = File(path + "/" + lname);
	if (ext === '.jpg') {
	  SaveJPG(saveFile);
	} else if (ext === '.png') {
	  SavePNG(saveFile);
	}
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function dupLayers() {
  var desc143 = new ActionDescriptor();
  var ref73 = new ActionReference();
  ref73.putClass( charIDToTypeID('Dcmn') );
  desc143.putReference( charIDToTypeID('null'), ref73 );
  desc143.putString( charIDToTypeID('Nm  '), activeDocument.activeLayer.name );
  var ref74 = new ActionReference();
  ref74.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
  desc143.putReference( charIDToTypeID('Usng'), ref74 );
  executeAction( charIDToTypeID('Mk  '), desc143, DialogModes.NO );
};

function SavePNG(saveFile){
  var pngOpts = new ExportOptionsSaveForWeb;
  pngOpts.format = SaveDocumentType.PNG
  pngOpts.PNG8 = false;
  pngOpts.transparency = true;
  pngOpts.interlaced = false;
  pngOpts.quality = 100;
  activeDocument.exportDocument(new File(saveFile), ExportType.SAVEFORWEB, pngOpts);
}

function SaveJPG(saveFile){
  var jpgOpts = new ExportOptionsSaveForWeb;
  jpgOpts.format = SaveDocumentType.JPEG
  jpgOpts.quality = 51;
  activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,jpgOpts);
}
