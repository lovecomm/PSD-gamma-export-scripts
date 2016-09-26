#target photoshop
// Export each top layer group (artboards) as a PNG
var destStatics = new Folder(activeDocument.path + '/../assets/static-banners/')
var doc = activeDocument;
if (!destStatics.exists) {
    destStatics.create();
}

(function getLayers(el) {
	// find layer groups
	 for (var a = 0; a < el.layerSets.length; a++) {
		 var lname = el.layerSets[a].name;
     var exportName = '';
		 if (lname != 'Null' && lname != 'NULL' && lname != 'null') {
       var ext = lname.substr(-4);
       if (ext === '.png') {
          var exportName = lname;
       } else if (ext === '.jpg') {
          var exportName = lname.replace('.jpg', '.png')
       } else {
          var exportName = lname + '.png'
       }
      saveLayer(el.layers.getByName(lname), exportName, destStatics, true);
		 }
	 }
})(doc)

function saveLayer(layer, lname, path, shouldMerge) {
  activeDocument.activeLayer = layer;
  dupLayers();
  if (shouldMerge === undefined || shouldMerge === true) {
    activeDocument.mergeVisibleLayers();
  }
  activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
  var saveFile = File(path + "/" + lname);
	SavePNG(saveFile);
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
  pngOpts.PNG8 = true;
  pngOpts.transparency = true;
  pngOpts.interlaced = false;
  pngOpts.quality = 100;
  activeDocument.exportDocument(new File(saveFile), ExportType.SAVEFORWEB, pngOpts);
}