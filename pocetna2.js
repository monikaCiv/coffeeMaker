var podaci = [
	{ 'id':1, 'naziv':'ESPRESSO',	 'Espresso':20,	 'Mlijeko':0,	'Pjena':0,	'Voda':0,  'Kakao':0,  'url':'slike/espresso.png' },
	{ 'id':2, 'naziv':'MACHIATTO',	 'Espresso':20,	 'Mlijeko':20,	'Pjena':0,	'Voda':0,  'Kakao':0,  'url':'slike/machiatto.png'},
	{ 'id':3, 'naziv':'DOPPIO',		 'Espresso':40,	 'Mlijeko':0,	'Pjena':0,	'Voda':20, 'Kakao':0,  'url':'slike/doppio.png'},
	{ 'id':4, 'naziv':'CAPPUCCINO',	 'Espresso':20,	 'Mlijeko':30,	'Pjena':20,	'Voda':0,  'Kakao':5,  'url':'slike/cappuccino.png'},
	{ 'id':5, 'naziv':'CAFE LATTE',	 'Espresso':20,	 'Mlijeko':60,	'Pjena':20,	'Voda':0,  'Kakao':0,  'url':'slike/cafelatte.png'},
	{ 'id':6, 'naziv':'FLAT WHITE',	 'Espresso':20,	 'Mlijeko':60,	'Pjena':0,	'Voda':0,  'Kakao':0,  'url':'slike/flatwhite.png'},
	{ 'id':7, 'naziv':'LONG BLACK',  'Espresso':40,	 'Mlijeko':0,	'Pjena':0,	'Voda':60, 'Kakao':0,  'url':'slike/longblack.png'},
	{ 'id':8, 'naziv':'CRAZY DOSE','Espresso':100, 'Mlijeko':0,	'Pjena':0,	'Voda':0,  'Kakao':0,  'url':'slike/crazydose.png'}
	];

var elementiBoje = [
	{'naziv' : 'Espresso','boja' : '#4c342a'},
	{'naziv' : 'Mlijeko', 'boja' : '#ad946b'},
	{'naziv' : 'Pjena',   'boja' : '#fcccc4'},
	{'naziv' : 'Voda',    'boja' : '#89C4F4'},
	{'naziv' : 'Kakao',   'boja' : '#140A03'}
	];

var salicaTocke = [
	{ 'x': 70,   'y': 520}, { 'x': 270,   'y': 520},
	{ 'x': 300,   'y': 135},{ 'x': 320,   'y': 135},
	{ 'x': 320,   'y': 110},{ 'x': 300,   'y': 110},
	{ 'x': 285,   'y': 60}, { 'x': 55,   'y': 60},
	{ 'x': 40,   'y': 110}, { 'x': 20,   'y': 110},
	{ 'x': 20,   'y': 135}, { 'x': 40,   'y': 135},
	{ 'x': 70,   'y': 520}
	];

//CRTANJE ŠALICE

var svgContainer = d3.select('.mixer').append('svg')
                                .attr('width', 400)
                                .attr('height', 600);

var clipPath =
	svgContainer.append('defs').append('clipPath').attr('id','okvir');

var lineFunction = d3.svg.line()
                                .x(function(d) { return d.x; })
                                .y(function(d) { return d.y; })
                                .interpolate('linear');

var lineGraph = clipPath.append('path')
                                .attr('d', lineFunction(salicaTocke));

//VANJSKI RUB
salicaTocke[12].y = 527;
svgContainer.append('path')
                                .attr('d', lineFunction(salicaTocke))
                                .attr('stroke', 'white')
                                .attr('fill', 'transparent')
                                .attr('stroke-width', 15);

//BOJA UNUTAR
svgContainer.append('path')
                                .attr('d', lineFunction(salicaTocke))
                                .attr('stroke', 'white')
                                .attr('fill', 'white')
                                .attr('stroke-width', 10);

//IZRADA IZBORNIKA
var svgContainer2 = d3.select('.coffee').append('svg')
                                .attr('width',400)
                                .attr('height',600);

var pomakKvadrat = 50;
var pomakTekst = 50;
var id;

//KVADRATIÆI IZBORNIKA
svgContainer2.selectAll('rect')
        .data(podaci)
        .enter()
        .append('rect')
        .attr('x',300)
        .attr('y', function (d,i) {
                return 100 + pomakKvadrat*i; })
        .attr('width',40)
        .attr('height',40)
        .attr('id',function (d,i) {
                return i+1; })
        .style({'fill' :'transparent',
                        'stroke' : '#87714e',
                        'stroke-width' : 3})
        .on('click',odabirKave)
        .on('mouseover', function (){
                        d3.select(this).style('fill','#87714e');})
        .on('mouseout', odabirMouseout);

//TEKST IZBORNIKA
svgContainer2.selectAll('text')
        .data(podaci)
        .enter()
        .append('text')
        .text(function (d) {
                return d.naziv; })
        .attr('x',150)
        .attr('y',function (d,i) {
                return 125 + pomakTekst*i; })
        .style({'font-size' : '11pt',
                        'font-family' : 'Verdana',
                        'text-anchor' : 'start'});

//FUNKCIJE KORIŠTEN
//

//ODABIRANJE KAVE I BOJENJE SAMO JEDNOG ODABRANOG KVADRATA IZBORNIKA U ODREÐENU BOJU
function odabirKave() {
        id = parseInt(d3.select(this).attr('id'));
        console.log(id);
        svgContainer2.selectAll('rect').style('fill',
                function(d,i) {
                        if((i+1) === id) {
                        return '#87714e';
                }
                else {
                        return 'transparent';
                }
        });
        crtanjeKave(id);
		promjenaSlike(id);
};

//KADA MAKNEMO MIŠ S KLIKNUTOG ODABIRA DA SE NE PROMIJENI BOJA ODABRANOG KVADRATA 
function odabirMouseout () {
        svgContainer2.selectAll('rect').style('fill',
        function(d,i) {
                if((i+1) === id) {
                        return '#87714e';
                }
                else {
                        return 'transparent';
                }
        });
};

//CRTA SVE ELEMENTE KAVE REDOM
function crtanjeKave (id) {
        var elementi = new Array(elementiBoje.length);
        for (var k = 0; k < elementi.length; k++) {
                elementi[k] = podaci[id-1][elementiBoje[k].naziv];
        }
        var elementiNaopako = elementi.reverse();

        var elementi2 = new Array(elementiBoje.length);
        for (var k = 0; k < elementi2.length; k++) {
                elementi2[k] = podaci[id-1][elementiBoje[k].naziv];
        }
        for (var k = 1; k < elementi.length; k++) {
                elementi2[k]+=elementi2[k-1];
        }
        var elementiVisineNaopako = elementi2.reverse();
        
		console.log(elementiNaopako);
        console.log(elementiVisineNaopako);

        svgContainer.selectAll('rect').remove();
        for (k = 0; k < elementi.length; k++) {
        svgContainer.append('rect')
                .attr('x',20)
                .attr('y', 520-(375*elementiVisineNaopako[k]/100) + (375*elementiVisineNaopako[k]/100) )
                .attr('width',300)
                .attr('height', 0)
                .attr('id',elementiBoje[elementi.length-1-k].naziv)
                .attr('clip-path','url(#okvir)')
                .style('fill', elementiBoje[elementi.length-1-k].boja)
                .style('stroke-width',0)
				.on("mouseover", function(){ 
					d3.select(this).style('fill-opacity',.5);
					var boja = d3.select(this).style('fill');
					console.log(boja);
					tooltip
						.style("visibility", "visible").style("opacity",".7")
						.html(this.id)
						.append('div')
						.style('height','20px')
						.style('width','20px')
						.style('background-color',boja)
						.style('float','left')
						.style('margin-top','1px')
						.style('margin-right','10px');
					})
				.on("mousemove", function(){ 	 
					d3.select(this).style('fill-opacity',.8);
					tooltip
						.style('left', (d3.event.pageX - 20) + 'px')
						.style('top', (d3.event.pageY + 20) + 'px')
					})
				.on("mouseout", function(){
					d3.select(this).style('fill-opacity',1);
					tooltip.style("visibility", "hidden");});
		}
				
		var animacija = svgContainer.selectAll("rect")
                        .data(elementiNaopako)
						.attr("height", function(d) {
							return 375 * d/100; 
						})
						.transition()
						.duration(function(d,i) { return elementiVisineNaopako[i]*50; })
						.ease('linear')
						.attr("y",  function(d,i) { 
							return (520-(375*elementiVisineNaopako[i]/100));
						});
		
		svgContainer.selectAll('.postotak').remove();
        for (z = 0; z < elementi.length; z++) {
		svgContainer.append('text')
				.text(function () { if (elementiNaopako[z] !== 0) { return elementiNaopako[z]+"%";} else return "";})
				.attr('x',150)
				.attr('y',520-(375*elementiVisineNaopako[z]/100) + (375*elementiVisineNaopako[z]/100))
				.attr('class','postotak')
				.style('fill','white');
		console.log(z);
		console.log(elementiVisineNaopako[z]);
        }	
		
		var pojavaTeksta = svgContainer.selectAll(".postotak")
                        .data(elementiNaopako)
						.transition()
						.duration(function() { return 0; })
						.attr("y",  function(d,i) { 
							return (535-(375*elementiVisineNaopako[i]/100));
						});
};
//TOOLTIP KAVE

var tooltip = d3.select("body")
        .append("div")
		.attr('id','tooltip')
        .style('background-color','white')
        .style('padding','15px')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('font-family','Open Sans')
		.style('font-weight','800')
		.style('font-size','14px')
        .style('border-radius','10px');
		
var tooltip2 = d3.select("body")
        .append("div")
		.attr('id','tooltip2')
        .style('background-color','white')
        .style('padding','15px')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('font-family','Open Sans')
		.style('font-weight','800')
		.style('font-size','14px')
        .style('border-radius','10px')
		.html('haha');

//SLIKE

d3.select('.slike').selectAll('img')
	.data(podaci)
	.enter()
	.append('img')
	.attr('height','210px')
	.attr('width','210px')
	.style('margin', '35px')
	.style('align','center')
	.style('opacity',.2)
	.attr('name', function(d) { return d.naziv; })
	.attr('src', function(d) { return d.url; });
	
function promjenaSlike(id) {
	d3.select('.slike').selectAll('img')
	.style('opacity', 
			function(d) {
				if(d.url == "slike/" +  (podaci[id-1]['naziv'].toLowerCase()).replace(/\s/g,'') + ".png") {
					return "1"; }
				else { 
				return ".2";
			}
			})
	.on("mouseover", function(){ 	
		if (this.name == podaci[id-1]['naziv']) { tooltip2
			.style("visibility", "visible").style("opacity",".9")
			.html(this.name + " je vaÅ¡ izbor! :)")
		}
	})
	.on("mousemove", function(){ 
		if (this.name == podaci[id-1]['naziv']) { 
		tooltip2
			.style('left', (d3.event.pageX - 20) + 'px')
			.style('top', (d3.event.pageY + 20) + 'px')
		}
	})
	.on("mouseout", function(){
		tooltip2.style("visibility", "hidden");
	});
};
	


