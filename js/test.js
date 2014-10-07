var map, geocoder, csv;
require([
    "esri/map", "esri/dijit/Geocoder", "esri/layers/CSVLayer",
    "esri/layers/FeatureLayer", "dojo/dom","esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol","esri/layers/LabelLayer",
    "esri/InfoTemplate", "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol", "esri/renderers/ClassBreaksRenderer", 
    "esri/renderers/ScaleDependentRenderer", "dojo/_base/Color", 
    "dojo/dom-style", "dojo/domReady!"
], function(
        Map, Geocoder, CSVLayer, 
        FeatureLayer, dom, SimpleLineSymbol, 
        SimpleFillSymbol, TextSymbol, LabelLayer,
        InfoTemplate, SimpleFillSymbol, SimpleRenderer, 
        SimpleMarkerSymbol, ClassBreaksRenderer,
         ScaleDependentRenderer, Color,  domStyle
        ) {
    map = new Map("map", {
        basemap: "gray",
        center: [-98.215, 38.382],
        zoom: 4,
    });

    /// Adding black map
    //var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Dark_Gray_Base_Beta/MapServer");
    //map.addLayer(basemap);

    MyGeocoder = [{
        url: "findAddressCandidates?category=Region,Subregion,Postal",
        placeholder: "Find a place",
        sourceCountry: "USA"
    }];
    geocoder = new Geocoder({
        //arcgisGeocoder: false, 
       // geocoders: MyGeocoder,
        arcgisGeocoder: [ {
            url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/?findAddressCandidates?category=Region,Subregion,Postal",
            name: "Esri Geocoder USA",
            placeholder: "Locate",
            outFields: "*", 
            category: "Region,Subregion,Postal"
        }], 
        autoComplete: true,
        category:"Region,Subregion,Postal",
        map: map
        }, dom.byId("search"));

        geocoder.startup();

        geocoder.on("select", function(evt){
            console.log(evt);
        });
    // csv = new CSVLayer("data/accident.csv");

    // var orangeRed = new Color([238, 69, 0, 0.5]); // hex is #ff4500
    // var marker = new SimpleMarkerSymbol("solid", 15, null, orangeRed);
    // var renderer = new SimpleRenderer(marker);
    // csv.setRenderer(renderer);
    
    // var template = new InfoTemplate("${ID}", "${CITY}");
    // csv.setInfoTemplate(template);
    //On Map extent change

    //map.addLayer(csv);

    var symbol = new SimpleFillSymbol();
   symbol.setColor(new Color([193, 53, 53, 0.0]));
    var statesColor = new Color("#666");
    var statesLine = new SimpleLineSymbol("solid", statesColor, 1.5);
    var statesSymbol = new SimpleFillSymbol("solid", statesLine, null);
    var statesRenderer = new SimpleRenderer(statesSymbol);

        var symbol2 = new SimpleMarkerSymbol(
          SimpleMarkerSymbol.STYLE_CIRCLE, 
          19, 
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_NULL, 
            new Color([247, 34, 101, 0.9]), 
            1
          ),
          new Color([193, 53, 53, 0.2])
        );

    // Add five breaks to the renderer.
    // If you have ESRI's ArcMap available, this can be a good way to determine break values.
    // You can also copy the RGB values from the color schemes ArcMap applies, or use colors
    // from a site like www.colorbrewer.org
    
   

    // alternatively, ArcGIS Server's generate renderer task could be used
    var rend = new SimpleRenderer(symbol);
    var renderer = new SimpleRenderer(symbol2);



     // alternatively, ArcGIS Server's generate renderer task could be used
    var countyrenderer = new ClassBreaksRenderer(symbol, "num_fata_1");
    countyrenderer.addBreak(0, 25, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
    countyrenderer.addBreak(25, 75, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
    countyrenderer.addBreak(75, 175, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
    countyrenderer.addBreak(175, 400, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
    countyrenderer.addBreak(400, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));


     // alternatively, ArcGIS Server's generate renderer task could be used
    var ziprenderer = new ClassBreaksRenderer(symbol, "num_fata_1");
    ziprenderer.addBreak(0, 5, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
    ziprenderer.addBreak(5, 10, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
    ziprenderer.addBreak(10, 20, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
    ziprenderer.addBreak(20, 30, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
    ziprenderer.addBreak(30, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));



    //state renderer
    var stateInfoTemplate = new InfoTemplate("${NAME}", "${*}");
    var stateFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/test/FeatureServer/2",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: stateInfoTemplate
    });


    var countyInfoTemplate = new InfoTemplate("${NAME}", "${*}");
    var countyFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/test/FeatureServer/0",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: countyInfoTemplate
    });


    var zipInfoTemplate = new InfoTemplate("${NAME}", "${*}");
    var zipFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/test/FeatureServer/1",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: zipInfoTemplate
    });

    var accidentsInfoTemplate = new InfoTemplate("${NAME}", "${*}");
    var accidentsFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/test/FeatureServer/4",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: accidentsInfoTemplate
    });


    //zipFeatureLayer.setDefinitionExpression("STATE = 'CA'");
    map.addLayer(accidentsFeatureLayer);
    stateFeatureLayer.setRenderer(rend);
    map.addLayer(stateFeatureLayer); 
    countyFeatureLayer.setRenderer(rend);
    map.addLayer(countyFeatureLayer);
    zipFeatureLayer.setRenderer(rend);
    map.addLayer(zipFeatureLayer);
    accidentsFeatureLayer.setRenderer(renderer);

     // create a text symbol to define the style of labels
    var statesLabel = new TextSymbol().setColor(new Color([0, 0, 0, 1]));
    statesLabel.font.setSize("10pt");
    statesLabel.font.setFamily("arial");

    statesLabelRenderer = new SimpleRenderer(statesLabel);
    var labels = new LabelLayer({ id: "labels" });
    // tell the label layer to label the countries feature layer 
    // using the field named "admin"
    labels.addFeatureLayer(stateFeatureLayer, statesLabelRenderer, "{" + "NAME_1" + "}");
    // add the label layer to the map
    map.addLayer(labels);


    // create a text symbol to define the style of labels
    var countyLabel = new TextSymbol().setColor(new Color([0, 0, 0, 1]));
    countyLabel.font.setSize("10pt");
    countyLabel.font.setFamily("arial");

    countyLabelRenderer = new SimpleRenderer(countyLabel);
    var countylabels = new LabelLayer({ id: "countylabels" });
    // tell the label layer to label the countries feature layer 
    // using the field named "admin"
    countylabels.addFeatureLayer(countyFeatureLayer, countyLabelRenderer, "{" + "county" + "}");
    // add the label layer to the map
    map.addLayer(countylabels);


   var zipLabel = new TextSymbol().setColor(new Color([0, 0, 0, 1]));
    zipLabel.font.setSize("10pt");
    zipLabel.font.setFamily("arial");

    zipLabelRenderer = new SimpleRenderer(zipLabel);
    var ziplabels = new LabelLayer({ id: "ziplabels" });
    // tell the label layer to label the countries feature layer 
    // using the field named "admin"
    ziplabels.addFeatureLayer(zipFeatureLayer, zipLabelRenderer, "{" + "ZIPCODE" + "}");
    // add the label layer to the map
    map.addLayer(ziplabels);


    map.on("extent-change", function(){ 
        console.log(map.getLevel());
        console.log(countyFeatureLayer);
        console.log(zipFeatureLayer);
        
        if( map.getLevel() <= 6){
           stateFeatureLayer.setVisibility(true); 
           countyFeatureLayer.setVisibility(false); 
           zipFeatureLayer.setVisibility(false); 
        } else if(map.getLevel() > 6 &&  map.getLevel() <= 10){
            stateFeatureLayer.setVisibility(false);
            countyFeatureLayer.setVisibility(true); 
            zipFeatureLayer.setVisibility(false); 
        } else { 
            countyFeatureLayer.setVisibility(false); 
            stateFeatureLayer.setVisibility(false); 
            zipFeatureLayer.setVisibility(true); 
         }


    });
});
