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
var fun; 

var mapmode = function(mode){
    if( mode == "hm"){
        zipFeatureLayer.setVisibility(false);
        countyFeatureLayer.setVisibility(false);
        accidentsFeatureLayer.setVisibility(true);
        //zipRecomentdationLayer.setVisibility(false);
        //countyRecomentdationLayer.setVisibility(false);
        gi = false; 
        hm = true; 

    } else if (mode == "gi") { 
        stateFeatureLayer.setVisibility(true);
        zipFeatureLayer.setVisibility(true);
        countyFeatureLayer.setVisibility(true);
        accidentsFeatureLayer.setVisibility(false);
        //zipRecomentdationLayer.setVisibility(false);
        //countyRecomentdationLayer.setVisibility(false);
        hm = false;
        gi = true;
    } else {
        stateFeatureLayer.setVisibility(false);
        zipFeatureLayer.setVisibility(false);
        countyFeatureLayer.setVisibility(false);
        accidentsFeatureLayer.setVisibility(false);
        //zipRecomentdationLayer.setVisibility(true);
        //countyRecomentdationLayer.setVisibility(true);
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
        //zipRecomentdationLayer.setVisibility(false);
        //countyRecomentdationLayer.setVisibility(false);
    } else { 
        countyFeatureLayer.setVisibility(false); 
        countyFeatureLayerCapita.setVisibility(true); 
        zipFeatureLayer.setVisibility(false); 
        zipFeatureLayerCapita.setVisibility(true); 
        //zipRecomentdationLayer.setVisibility(false);
        //countyRecomentdationLayer.setVisibility(false);
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
    //zipRecomentdationLayer.setVisibility(false);
    //countyRecomentdationLayer.setVisibility(false);
   
} else {
    map.setBasemap("gray");
    countyFeatureLayer.setVisibility(false); 
    countyFeatureLayerCapita.setVisibility(false); 
    zipFeatureLayer.setVisibility(false); 
    zipFeatureLayerCapita.setVisibility(false); 
    accidentsFeatureLayer.setVisibility(false);
    //zipRecomentdationLayer.setVisibility(true);
    //countyRecomentdationLayer.setVisibility(true);
}

};



var clusterFilter = function(){ 
    var queryString = "";
     if(document.getElementById('cluster1').checked){
        queryString = "new_cluste = 1 ";
     } else {
        queryString = "new_cluste = 0 ";
     }
     if(document.getElementById('cluster2').checked){
        queryString += "OR new_cluste = 2 ";
     }
     if(document.getElementById('cluster3').checked){
        queryString += "OR new_cluste = 3 ";
     }
     if(document.getElementById('cluster4').checked){
        queryString += "OR new_cluste = 4 ";
     }
     if(document.getElementById('cluster5').checked){
        queryString += "OR new_cluste = 5 ";
     }
     if(document.getElementById('cluster6').checked){
        queryString += "OR new_cluste = 6 ";
     }
     if(document.getElementById('cluster7').checked){
        queryString += "OR new_cluste = 7 ";
     }
     if(document.getElementById('cluster8').checked){    
        queryString += "OR new_cluste = 8";
    }
    accidentsFeatureLayer.setDefinitionExpression(queryString);
};


var fun = function(type){ 
        if(type == 1){
            return "speeding accidents";
        } else if(type == 2){
            return "rush hour commuters";
        }else if(type == 3){
            return "carpooling";
        }else if(type == 4){
            return "bicyling";
        }else if(type == 5){
            return "spanish speakers";
        }else if(type == 6){
            return "accidents on ice";
        }else if(type == 7){
            return "public transit";
        }else if(type == 8){
            return "accidents on gravel";
        }else if(type == 9){
            return "motorcycle riders";
        }else if(type == 10){
            return "accidents driving off the road";
        }else if(type == 11){
            return "accidents driving drunk";
        }else if(type == 12){
            return "accidents not using seatbelt";
        }else if(type == 13){
            return "manufacturing jobs";
        }else if(type == 14){
            return "bicyclists killed";
        }else if(type == 15){
            return "pedestrians killed";
        }else if(type == 16){
            return "motorcyclists killed";
        }else if(type == "17"){
            return "Production and Transportation Jobs";
        }else if(type == 18){
            return "highway deaths";
        }else if(type == 19){
            return "accidents on unlit roads";
        }else if(type == 20){
            return "construction jobs";
        }else{
            return type;

        }
        
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


    var countyjson = {title:"${NAME_2} County",content: "<tr>State Name: <td>${NAME_1}</td></tr> " + 
                                             "<br><tr>Number of Accidents: <td>${num_accide}</td></tr> " + 
                                             "<br><tr>Number of Fatalities: <td>${num_fatals}</td></tr>" + 
                                             "<br><tr>Number of Deaths in Vehicles: <td>${num_fata_1}</td></tr>" + 
                                             "<br><tr>Number of Pedestrian Deaths: <td>${num_fata_2}</td></tr>" + 
                                             "<br><tr>Population: <td>${population}</td></tr>" + 
                                             "<br><tr>Area: <td>${area} Square Miles</td></tr>"  + 
                                             "<br><br><b><tr>Policy Recomendation(s):</b> <br><td>${Policy_Rec} ${Policy_R_1} ${Policy_R_2} ${Policy_R_3} ${Recommenda} ${Recommen_1} ${Recommen_2}</td></tr>" +
                                             "<br><br><tr><b>General Recomendation(s):</b> <br><td>${General_Re} ${General__1} ${General__2} ${General__3}</td></tr><br><br>"  

                                         };

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
    zipFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/4",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: zipInfoTemplate
    });
    zipFeatureLayerCapita = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/3",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: zipInfoTemplateCapita
    });



 var attr = {title:" ",content: "<tr>Number of Yelp Biz: <td>${F__of_Yelp}</td></tr> " + 
                                             "<br><tr>Roadway: <td>${Roadway_}</td></tr> " + 
                                             "<br><tr>Number of Pedestrians: <td>${F__of_Pede}</td></tr>" + 
                                             "<br><tr>Number of Vehicles: <td>${F__of_Vehi}</td></tr>" + 
                                             "<br><tr>Weather: <td>${Weather_}</td></tr>" + 
                                             "<br><tr>Number of Drunk Drivers: <td>${F__of_Drun}</td></tr>" + 
                                             "<br><tr>Driver's Age: <td>${Driver_Age}</td></tr>"  + 
                                             "<br><tr>Hour of the Day: <td>${Hour_of_Da}</td></tr>"  + 
                                             "<br><tr>Day of the Week: <td>${Day_Of_Wee}</td></tr>" +
                                             "<br><tr>Cluster: <td>${new_cluste}</td></tr>" 
                                         };






    var accidentsInfoTemplate = new InfoTemplate(attr);
    accidentsFeatureLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/5",{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: accidentsInfoTemplate
    });
    accidentsFeatureLayer.setDefinitionExpression("new_cluste = 1");

    renderer1 = new ClassBreaksRenderer(accidentsFeatureLayer, "new_cluste");
    renderer1.addBreak(1, 1, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([204, 0, 0, 0.3] )));
    renderer1.addBreak(2, 2, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([204, 204, 0, 0.3] )));
    renderer1.addBreak(3, 3, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([0, 255, 0, 0.3] )));
    renderer1.addBreak(4, 4, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([0, 102, 204, 0.3] )));
    renderer1.addBreak(5, 5, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([127, 0, 127, 0.3] )));
    renderer1.addBreak(6, 6, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([255, 0, 255, 0.3] )));
    renderer1.addBreak(7, 7, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([0, 0, 0, 0.3] )));
    renderer1.addBreak(8, 8, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 13, null, new Color([0, 204, 204, 0.3] )))


    // var countyrec = {title:"${ZIPCODE}",content:"<tr>State: <td>${STATE}</td></tr> "+ 
    //                                          "<br><tr>Cluster Recomendation(s): <td>${top_cluse} and ${second_clu}</td></tr>"+ 
    //                                          "<br><tr>SVM Recomendation(s): <td> " + fun("${rec1}") + " ${rec2} ${rec3} </td></tr>"+ 
    //                                          "<br><tr>Risk Score: <td>${risk}</td></tr>"};

    // var countyRecomentdationInfoTemplate =new InfoTemplate(countyrec);
    // countyRecomentdationLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/3",{
    //     mode: FeatureLayer.MODE_ONDEMAND,
    //     outFields: ["*"],
    //     infoTemplate: countyRecomentdationInfoTemplate
    // });


    // var ziprec = {title:"${ZIPCODE}",content:"<tr>State:<td>${STATE}</td></tr> "+ 
    //                                          "<br><tr>Cluster Recomendation(s): <td>${top_cluse} and ${second_clu}</td></tr>"+ 
    //                                          "<br><tr>SVM Recomendation(s): <td>${rec1} ${rec2} ${rec3} </td></tr>"+ 
    //                                          "<br><tr>Risk Score:<td>${risk}</td></tr>"};

    // var zipRecomentdationInfoTemplate =new InfoTemplate(ziprec);
    // zipRecomentdationLayer = new FeatureLayer("http://services2.arcgis.com/OtgATC5c4o2eFVW8/arcgis/rest/services/capstoneProject/FeatureServer/7",{
    //     mode: FeatureLayer.MODE_ONDEMAND,
    //     outFields: ["*"],
    //     infoTemplate: zipRecomentdationInfoTemplate
    // });



   map.addLayer(accidentsFeatureLayer);
    accidentsFeatureLayer.setVisibility(false);
   //stateFeatureLayer.setRenderer(rend);
   // map.addLayer(countyRecomentdationLayer);
    map.addLayer(countyFeatureLayer);
    map.addLayer(countyFeatureLayerCapita);
    map.addLayer(stateFeatureLayer); 
    //countyFeatureLayer.setRenderer(rend);
    //zipFeatureLayer.setRenderer(rend);
    //map.addLayer(zipRecomentdationLayer);
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
