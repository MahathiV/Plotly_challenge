var metadata
var id  , ethnicity , gender,age ,loc,bbtype  , freq 
//var select_tag = d3.selectAll("#selDataset").attr("id","data_id").on('change',optionChanged)
//select_tag.attr("selected","selected")
//var select_tag = d3.selectAll("#selDataset")


var select_tag = d3.selectAll("#selDataset").on('change',optionChanged)



//d3.select("#sample-metadata").append("label").attr("for","age").text("AGE :")

//d3.select("#sample-metadata").append("form").attr("class","form-group").append("label").attr("for","age").text("Age :")

//d3.select("#sample-metadata").append("form").text("AGE :")

var form_tag = d3.select("#sample-metadata").append("form").attr("class","form-group").append("ul").attr("class","list-group")

//var li_tag1 = form_tag.append("li").attr("class","list-group-item").append("h5").text("AGE :")



var h5_1 = form_tag.append("h5").text("AGE :")
var age_tag = h5_1.append("label").attr("for","age").append("h5").text("age")
//h5_1.append("h5").text("age")
//h5_1.append("input").attr("class","form-control").attr("id","age").text("age")

//<input class="form-control" id="datetime" type="text" placeholder="1/11/2011">


var h5_2 = form_tag.append("h5").text("BBTYPE :")
var bbtag = h5_2.append("label").attr("for","bbtype").append("h5").text("bbtype")

var h5_3 = form_tag.append("h5").text("ETHNICITY :")
var eth_tag = h5_3.append("label").attr("for","ethn").append("h5").text("ethn")

var h5_4 = form_tag.append("h5").text("GENDER :")
var gen_tag = h5_4.append("label").attr("for","gender").append("h5").text("gen")

var h5_5 = form_tag.append("h5").text("LOCATION :")
var loc_tag = h5_5.append("label").attr("for","loc").append("h5").text("loc")

var h5_6 = form_tag.append("h5").text("WFREQ :")
var wfreq_tag = h5_6.append("label").attr("for","wfreq").append("h5").text("wfreq")

var h5_7 = form_tag.append("h5").text("sample :")
var sample_tag = h5_7.append("label").attr("for","sample").append("h5").text("samp")

//var ul_tag = d3.select("#sample-metadata").append("ul").attr("class","list-group").attr("id","display_sampledata")

//var li_tag1 = ul_tag.append("li").attr("class","list-group-item").text("AGE :")

d3.json("../../Starter_Code/samples.json").then((otu_data) => {
    
   //console.log(otu_data.names);
   //console.log(otu_data.metadata);
   //console.log(otu_data.samples)
   
   metadata = otu_data.metadata
   var sample_data = otu_data.samples

   //console.log(metadata[0].id)

   const selected_id = metadata[0].id

    //console.log("------------meta data iteration-------------")
    //console.log(metadata);
    optionChanged(metadata)
    var c = 0
    //console.log(sample_data[152]["id"])
    metadata.map(i => {
       
  
      if (selected_id === i.id)
      {
        var select_tag1 = select_tag.append("option").attr("value",i.id).text(i.id).attr("selected","selected")

        //var index = c
        id = i.id , ethnicity = i.ethnicity, gender = i.gender,age = i.age,loc=i.location,bbtype = i.bbtype , freq = i.wfreq
        //console.log(index)
        //c+=1

        
      
        demographic_info(id,age,bbtype,gender,loc,freq,ethnicity)

        //var ret_val = optionChanged(id,age,bbtype,gender,loc,freq,ethnicity)

        //demographic_info(id,age,bbtype,gender,loc,freq,ethnicity)
       
        //optionChanged(metadata)
        c+=1
        
      }
      if (selected_id !== i.id)
      {
        select_tag.append("option").attr("value",i.id).text(i.id)

        id = i.id , ethnicity = i.ethnicity, gender = i.gender,age = i.age,loc=i.location,bbtype = i.bbtype , freq = i.wfreq
      
       //optionChanged(id,age,bbtype,gender,loc,freq,ethnicity)
      
       //demographic_info(id,age,bbtype,gender,loc,freq,ethnicity)
        //optionChanged(metadata)

      // var ret_val = optionChanged(id,age,bbtype,gender,loc,freq,ethnicity)
      
       //demographic_info(id,age,bbtype,gender,loc,freq,ethnicity)
       c+=1
      }
    
    
    })
 
});

function demographic_info(id,age,bbtype,gender,loc,freq,ethnicity)
{
  console.log("------------function -------------")
  console.log(id)
  console.log(age)

  console.log("------------function -------------")
        sample_tag.text(id)
        age_tag.text(age)
        bbtag.text(bbtype)
        gen_tag.text(gender)
        loc_tag.text(loc)
        wfreq_tag.text(freq)
        eth_tag.text(ethnicity)
}

  var ids =[]
  var ages = []
  var eth =[]
  var gen = []
  var location = []
  var bb = []
  var wfreq = []


function optionChanged(metadata)
//function optionChanged()
{
  // var selected_item =d3.select(this)
  // var dropdown_value = selected_item.property("value")

    var selected_item =d3.select("#selDataset")
    
    var dropdown_value = selected_item.property("value")


  var len = metadata.length
   //console.log(len)
//  for (var i=0;i<len;i++)
  {
    //console.log(metadata[i].id)
    //ids.push(metadata[i].id)
   // ages.push(metadata[i].age)
  //  eth.push(metadata[i].ethnicity)
  //  gen.push(metadata[i].gender)
    //location.push(metadata[i].location)
   // bb.push(metadata[i].bbtype)
   // wfreq.push(metadata[i].wfreq)
 }

 //{"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0},

}