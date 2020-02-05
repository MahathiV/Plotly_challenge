
var select_tag = d3.selectAll("#selDataset").on('change',optionChanged)

var form_tag = d3.select("#sample-metadata").append("form").attr("class","form-group").append("ul").attr("class","list-group")

var h5_1 = form_tag.append("h5").text("AGE :")
var age_tag = h5_1.append("label").attr("for","age").append("h5").text("")

var h5_2 = form_tag.append("h5").text("BBTYPE :")
var bbtag = h5_2.append("label").attr("for","bbtype").append("h5").text("")

var h5_3 = form_tag.append("h5").text("ETHNICITY :")
var eth_tag = h5_3.append("label").attr("for","ethn").append("h5").text("")

var h5_4 = form_tag.append("h5").text("GENDER :")
var gen_tag = h5_4.append("label").attr("for","gender").append("h5").text("")

var h5_5 = form_tag.append("h5").text("LOCATION :")
var loc_tag = h5_5.append("label").attr("for","loc").append("h5").text("")

var h5_6 = form_tag.append("h5").text("WFREQ :")
var wfreq_tag = h5_6.append("label").attr("for","wfreq").append("h5").text("")

var h5_7 = form_tag.append("h5").text("sample :")
var sample_tag = h5_7.append("label").attr("for","sample").append("h5").text("")

page_load()

function gauge_plot(freq)
{

  //console.log(freq)
  // gauge chart
   
  var trace3 = {
    //domain: { x: [0, 9], y: [0, 9] },
    type: "indicator",
    mode: "gauge+number",
    value: freq,
    gauge: {
        axis : {range:[null,10]}
        },
    title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per week"}
 }

  var data = [trace3]

  var layout = {
    width: 500,
    height: 500,
    margin:{
         t:10
        },
  }
  Plotly.newPlot('gauge',data,layout)
  // gauge chart
}

function page_load()
{

d3.json("./samples.json").then((otu_data) => {
  var metadata = otu_data.metadata
  const selected_id = metadata[0].id

  console.log(otu_data)
 // console.log(otu_data.samples[152].id)

  metadata.map(i => {
    

    if (selected_id === i.id)
    {
      var select_tag1 = select_tag.append("option").attr("value",i.id).text(i.id).attr("selected","selected")
      demographic_info(i.id,i.age,i.bbtype,i.gender,i.location,i.wfreq,i.ethnicity)
      //demographic_info(k,v)
      buildplot(i.id)
      gauge_plot(i.wfreq)
    }
    if (selected_id !== i.id)
    {
      select_tag.append("option").attr("value",i.id).text(i.id)
    }
  })
  });
  
}

function demographic_info(id,age,bbtype,gender,loc,freq,ethnicity)
//function demographic_info(k,v)
{
        sample_tag.text(id)
        age_tag.text(age)
        bbtag.text(bbtype)
        gen_tag.text(gender)
        loc_tag.text(loc)
        wfreq_tag.text(freq)
        eth_tag.text(ethnicity)

        //console.log(k)
        //console.log(v)
        //k.forEach(function(n){
          //form_tag.append("h5").text(n)
        //})

}



function optionChanged()

{
   var selected_item =d3.selectAll("#selDataset").node()
   var select_val = selected_item.value;
   //var select_id = selected_item.id;

   //console.log(select_val)


    d3.json("./samples.json").then((otu_data) => {
    var metadata = otu_data.metadata
  
    metadata.map(i => {

      if (i.id == select_val)
      {
        //console.log(i.id)
        //console.log(select_val)
        demographic_info(i.id,i.age,i.bbtype,i.gender,i.location,i.wfreq,i.ethnicity)
        buildplot(i.id)
        gauge_plot(i.wfreq)
      }
      
    })
    });
   
}  
  
function buildplot(id)
{
  d3.json("./samples.json").then((otu_data) => {
    
    var sample_data = otu_data.samples

     sample_data.map(s =>{
      //console.log(s.id)
      //console.log(s.otu_ids)
      //console.log(s.sample_values)
      //console.log(s.otu_labels)
      if (s.id == id)
      {
        // Horizontal Bar Chart

         var test = sample_data[0]

         var sliced_o_ids = s.otu_ids.slice(0,10).reverse()
         var sliced_sample_values = s.sample_values.slice(0,10).reverse()
         var sliced_otu_labels = s.otu_labels.slice(0,10).reverse()
  
  
  
        var trace1 = {
        y: sliced_o_ids.map(obj => "OTU"+" "+obj),
        x: sliced_sample_values,
        text:sliced_otu_labels,
        type:"bar",
        orientation : "h"  
          };

      var data = [trace1]
  
      var layout = {
     // title : "Horizontal Bar Chart",
      height:750,
      margin: {
        l:100,
        r:50,
        b:100,
        t:10
           }
       }

       Plotly.newPlot("bar", data, layout);
       // Horizontal Bar Chart

       // bubble chart 
        var trace2 = {
                x:s.otu_ids,
                y:s.sample_values,
                text:s.otu_labels,
                mode:"markers",
                marker:{
                    color: test.otu_ids,
                    size:test.sample_values
                      }
                  };
  
          var data = [trace2]
  
          var layout = {
               xaxis:{title: "OTU ID"},
             // title:"Bubble-Chart",
              showlegend:false
                }
  
          Plotly.newPlot("bubble",data,layout)

        // bubble chart 

      } // if 
    }) // samples.json 
  }); // d3
}  // func bracket
 


