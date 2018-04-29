
function map(text, id){
    this.text = text;
    this.id = id;    
    var words = this.text.match(/\w+/g);
    var tf = {};
    for(var i=0; i<words.length; i++){
        // console.log(words[i]);
        
        if(tf[words[i]] == null)
            tf[words[i]] = 1;
        else
            tf[words[i]] += 1;
    }
    var emit = [];
    for (w in tf){
        // console.log(w);        
        var ret = {};
        ret[id] = tf[w];
        if(emit[w] == undefined)
            emit[w] = [tf[w]];
        else
            emit[w].append({w, rest});
        console.log(w, ret);
    }
    return emit;
}

var text = "You are insaneMy desireA violent daydreamLove, loveYou are crazyA perfect liarSaid you'd save meLove, loveI know the moment I looked into your eyesI'd have to swallow all your liesI never said that I would be your loverI never said that I would be your friendI never said that I would take no otherBe your loverNever saidYou are insaneMy desireA dangerous gameLove, loveYou are crazyA perfect liarSimply save meLove, loveI know the moment I looked into your eyesI'd have to swallow all your liesI never said that I would be your loverI never said that I would be your friendI never said that I would take no otherBe your loverNever saidOh, woahNo, ohNo, woahLove is madnessI knew the momentI knew the momentI knew the momentLove is madnessI knew the moment I looked into your eyesI knew the moment I looked into your eyesI knew the moment I looked into your eyesLove is madnessLoveI never said that I would be your loverI never said that I would be your friendI never said that I would take no otherBe your loverNever saidOh, woahNo, ohNo, woahLove is madnessLove is madness";
var id = 42;
console.log(map(text, id));
//console.log(this.text.match(/\w+/g));


function map(){
    var text = this.text;
    var id = this.id;    
    var words = text.match(/\w+/g);
    var tf = {};
    for(var i=0; i<words.length; i++){
        if(tf[words[i]] == null)
            tf[words[i]] = 1;
        else
            tf[words[i]] += 1;
    }
    for (w in tf){       
        var ret = {};
        ret[id] = tf[w];
        emit(w, ret);
    }
}

var reduce = function(key, values){
    var ret = {};
    for(var i=0; i<values.length; i++){
        for(d in values[i]){
            ret[d] = values[i][d];
        }
    }
    return ret;
}

var f = function(k, v){
    var df = Object.keys(v).length;
    var N = 100;
    for(d in v){
        v[d] = v[d]*Math.log(N/df);
    }
}
var rey = JSON.parse("{"+this.idm+"}")