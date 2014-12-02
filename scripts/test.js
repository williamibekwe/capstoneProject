var map, geocoder, maxExtent;
var stateFeatureLayer;
var zipFeatureLayer;
var zipFeatureLayerCapita;
var countyFeatureLayer;
var countyFeatureLayerCapita;
var accidentsFeatureLayer;
var countyRecomentdationLayer;
var zipRecomentdationLayer;
var gi = true;
var infomode = true; 
var renderer1;

var mapmode = function(mode){
    if( mode == "hm"){
        zipFeatureLayer.setVisibility(false);
        countyFeatureLayer.setVisibility(false);
        accidentsFeatureLayer.setVisibility(true);
        zipRecomentdationLayer.setVisibility(false);
        countyRecomentdationLayer.setVisibility(false);
        gi = false; 
        hm = true; 

    } else if (mode == "gi") { 
        stateFeatureLayer.setVisibility(true);
        zipFeatureLayer.setVisibility(true);
        countyFeatureLayer.setVisibility(true);
        accidentsFeatureLayer.setVisibility(false);
        zipRecomentdationLayer.setVisibility(false);
        countyRecomentdationLayer.setVisibility(false);
        hm = false;
        gi = true;
    } else {
        stateFeatureLayer.setVisibility(false);
        zipFeatureLayer.setVisibility(false);
        countyFeatureLayer.setVisibility(false);
        accidentsFeatureLayer.setVisibility(false);
        zipRecomentdationLayer.setVisibility(true);
        countyRecomentdationLayer.setVisibility(true);
        hm = false;
        gi = false;

    }
    checkLevels();
};

var mapversion = function(mode){

    if( mode == "area"){ 
        infomode = true;
    } else {
        infomode = false; 
    }
        checkLevels();

};

var checkLevels = function(){ 
if(gi){
        map.setBasemap("gray");
    if (infomode){
        countyFeatureLayer.setVisibility(true); 
        countyFeatureLayerCapita.setVisibility(false); 
        zipFeatureLayer.setVisibility(true); 
        zipFeatureLayerCapita.setVisibility(false); 
        zipRecomentdationLayer.setVisibility(false);
        countyRecomentdationLayer.setVisibility(false);
    } else { 
        countyFeatureLayer.setVisibility(false); 
        countyFeatureLayerCapita.setVisibility(true); 
        zipFeatureLayer.setVisibility(false); 
        zipFeatureLayerCapita.setVisibility(true); 
        zipRecomentdationLayer.setVisibility(false);
        countyRecomentdationLayer.setVisibility(false);
    }

    if(map.getLevel() < 10 ){
        stateFeatureLayer.setVisibility(true);
    } else { 
        stateFeatureLayer.setVisibility(false);
    }
} else if(hm){ 
            map.setBasemap("streets");

    countyFeatureLayer.setVisibility(false); 
    countyFeatureLayerCapita.setVisibility(false); 
    zipFeatureLayer.setVisibility(false); 
    zipFeatureLayerCapita.setVisibility(false); 
    accidentsFeatureLayer.setVisibility(true);
    zipRecomentdationLayer.setVisibility(false);
    countyRecomentdationLayer.setVisibility(false);
   
} else {
        map.setBasemap("gray");
    countyFeatureLayer.setVisibility(false); 
    countyFeatureLayerCapita.setVisibility(false); 
    zipFeatureLayer.setVisibility(false); 
    zipFeatureLayerCapita.setVisibility(false); 
    accidentsFeatureLayer.setVisibility(false);
    zipRecomentdationLayer.setVisibility(true);
    countyRecomentdationLayer.setVisibility(true);
}

};



var clusterFilter = function(){ 
    var queryString = "";
     if(document.getElementById('cluster1').checked){
        queryString = "cluster = 1 ";
     } else {
        queryString = "cluster = 0 ";
     }
     if(document.getElementById('cluster2').checked){
        queryString += "OR cluster = 2 ";
     }
     if(document.getElementById('cluster3').checked){
        queryString += "OR cluster = 3 ";
     }
     if(document.getElementById('cluster4').checked){
        queryString += "OR cluster = 4 ";
     }
     if(document.getElementById('cluster5').checked){
        queryString += "OR cluster = 5 ";
     }
     if(document.getElementById('cluster6').checked){
        queryString += "OR cluster = 6 ";
     }
     if(document.getElementById('cluster7').checked){
        queryString += "OR cluster = 7 ";
     }
     if(document.getElementById('cluster8').checked){    
        queryString += "OR cluster = 8";
    }
    accidentsFeatureLayer.setDefinitionExpression(queryString);
};


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
        zoom: 5,
    });

    /// Adding black map
    //var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/WM_Slate_Base/MapServer");
    //map.addLayer(basemap);

    geocoder = new Geocoder({
            autoComplete: true,
            highlightLocation: true,
            map: map,
            arcgisGeocoder: {
                outFields:"*",
                categories: ["Postal", "City", "Region", "Subregion"], 
                placeholder: "Enter a zipcode, county, or state.", 
                sourceCountry: "USA"
            }
        }, dom.byId("search"));

    geocoder.startup();

    geocoder.on("find-results", function(evt){
        console.log(evt.results); 
        if( evt.results[0].feature.attributes.Type == "State of Province"){   
        }
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
    symbol.setColor(new Color([238, 63, 63, 0.0]));
    var statesColor = new Color("#666");
    var statesLine = new SimpleLineSymbol("solid", statesColor, 1.5);
    var statesSymbol = new SimpleFillSymbol("solid", statesLine, null);
    var statesRenderer = new SimpleRenderer(statesSymbol);


    var rend = new SimpleRenderer(symbol);


    //state renderer
    
     stateFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/0",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"]
    });


    var countyjson = {title:"${county} County",content: "<tr>State Name: <td>${NAME_1}</td></tr> "+ 
                                             "<br><tr>Number of Accidents: <td>${num_accide}</td></tr> "+ 
                                             "<br><tr>Number of Fatalities: <td>${num_fatals}</td></tr>"+ 
                                             "<br><tr>Number of Deaths in Vehicles: <td>${num_fata_1}</td></tr>" + 
                                             "<br><tr>Number of Pedestrian Deaths: <td>${num_fata_2}</td></tr>" + 
                                             "<br><tr>Population: <td>${population}</td></tr>" + 
                                             "<br><tr>Square Mile Area: <td>${area}</td></tr>" };

    var countyInfoTemplate = new InfoTemplate(countyjson);
     countyFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/2",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: countyInfoTemplate
    }); 

    var countyInfoTemplateCapita = new InfoTemplate(countyjson);
    countyFeatureLayerCapita = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/1",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: countyInfoTemplateCapita
    });


    var zipjson = {title:"${ZIPCODE}",content:"<tr>State: <td>${STATE}</td></tr> "+ 
                                             "<br><tr>Number of Accidents: <td>${num_accide}</td></tr> "+ 
                                             "<br><tr>Number of Fatalities: <td>${num_fatals}</td></tr>"+ 
                                             "<br><tr>Number of Deaths in Vehicles: <td>${num_fata_1}</td></tr>" + 
                                             "<br><tr>Number of Pedestrian Deaths: <td>${num_fata_2}</td></tr>" + 
                                             "<br><tr>Population: <td>${population}</td></tr>" + 
                                             "<br><tr>Square Mile Area: <td>${area}</td></tr>"};

    var zipInfoTemplate = new InfoTemplate(zipjson);
    var zipInfoTemplateCapita = new InfoTemplate(zipjson);
    zipFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/5",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: zipInfoTemplate
    });
    zipFeatureLayerCapita = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/4",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: zipInfoTemplateCapita
    });

    var accidentsInfoTemplate = new InfoTemplate("${NAME}", "${*}");
    accidentsFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/6",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: accidentsInfoTemplate
    });
    accidentsFeatureLayer.setDefinitionExpression("cluster = 1");

    renderer1 = new ClassBreaksRenderer(accidentsFeatureLayer, "cluster");
    renderer1.addBreak(1, 1, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([204, 0, 0, 0.3] )));
    renderer1.addBreak(2, 2, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([204, 204, 0, 0.3] )));
    renderer1.addBreak(3, 3, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([0, 255, 0, 0.3] )));
    renderer1.addBreak(4, 4, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([0, 102, 204, 0.3] )));
    renderer1.addBreak(5, 5, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([127, 0, 127, 0.3] )));
    renderer1.addBreak(6, 6, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([255, 0, 255, 0.3] )));
    renderer1.addBreak(7, 7, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([0, 0, 0, 0.3] )));
    renderer1.addBreak(8, 8, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([0, 204, 204, 0.3] )))


    var countyrec = {title:"${ZIPCODE}",content:"<tr>State: <td>${STATE}</td></tr> "+ 
                                             "<br><tr>Cluster Recomendation(s): <td>${top_cluse} and ${second_clu}</td></tr>"+ 
                                             "<br><tr>SVM Recomendation(s): <td>${rec1} ${rec2} ${rec3} </td></tr>"+ 
                                             "<br><tr>Risk Score: <td>${area}</td></tr>"};

    var countyRecomentdationInfoTemplate =new InfoTemplate(countyrec);
    countyRecomentdationLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/3",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: countyRecomentdationInfoTemplate
    });


    var ziprec = {title:"${ZIPCODE}",content:"<tr>State:<td>${STATE}</td></tr> "+ 
                                             "<br><tr>Cluster Recomendation(s): <td>${top_cluse} and ${second_clu}</td></tr>"+ 
                                             "<br><tr>SVM Recomendation(s): <td>${rec1} ${rec2} ${rec3} </td></tr>"+ 
                                             "<br><tr>Risk Score:<td>${risk}</td></tr>"};

    var zipRecomentdationInfoTemplate =new InfoTemplate(ziprec);
    zipRecomentdationLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/7",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: zipRecomentdationInfoTemplate
    });



    map.addLayer(accidentsFeatureLayer);
    accidentsFeatureLayer.setVisibility(false);
   //stateFeatureLayer.setRenderer(rend);
    map.addLayer(countyRecomentdationLayer);
    map.addLayer(countyFeatureLayer);
    map.addLayer(countyFeatureLayerCapita);
    map.addLayer(stateFeatureLayer); 
    //countyFeatureLayer.setRenderer(rend);
    //zipFeatureLayer.setRenderer(rend);
    map.addLayer(zipRecomentdationLayer);
    map.addLayer(zipFeatureLayer);
    map.addLayer(zipFeatureLayerCapita);
    accidentsFeatureLayer.setRenderer(renderer1);
    


     // create a text symbol to define the style of labels
    var statesLabel = new TextSymbol().setColor(new Color([0, 0, 0, 1]));
    statesLabel.font.setSize("14pt");
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
    countylabels.addFeatureLayer(countyFeatureLayer, countyLabelRenderer, "{" + "county" + "} County");
    countylabels.addFeatureLayer(countyFeatureLayerCapita, countyLabelRenderer, "{" + "county" + "} County");
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
    ziplabels.addFeatureLayer(zipFeatureLayerCapita, zipLabelRenderer, "{" + "ZIPCODE" + "}");
    // add the label layer to the map
    map.addLayer(ziplabels);

    // Mouse click --> populate information 
    stateFeatureLayer.on("click", function(evt){ 
        console.log( "feature" + statejson.content);
    });

    map.on("extent-change", function(){ 
        console.log(map.getLevel());
        console.log(countyFeatureLayer);
     //   console.log(zipFeatureLayer);
        checkLevels();
        
    });

    map.on("update-start", function(){ 
        document.getElementById('load').style.display = 'initial';
    });
    map.on("update-end", function(){ 
        document.getElementById('load').style.display = 'none';
    });


});
