/*
*Programmer: Lucas Cassiano
*(c) Lucas Cassiano - 2014
*Script to generation of graphics
*/

	var width=600;
	var height=300;
	var c=document.getElementById("myCanvas");
	c.width=width;
	var ctx=c.getContext("2d");
	ctx.fillStyle="#fff";
	ctx.fillRect(0,0,width,height);
	ctx.beginPath();
	ctx.moveTo(0,0);
	var grid=true;
	var background="#fff";
	var grid_color="#ccc";
	var max_x=12;
	var max_y=2;
	var offset_x=40;
	var offset_y=30;
	var codigo="";
	function DrawCode(){
		codigo = document.getElementById("codigo").value;
		//var cabecalho = document.getElementById("cabecalho").value;
		//eval(cabecalho);
		
		background= document.getElementById("background_color").value;
		grid_color= '#'+document.getElementById("grid_color").value;
		
		width=document.getElementById("width").value;
		height=document.getElementById("height").value;
		max_x=document.getElementById("max_x").value;
		max_y=document.getElementById("max_y").value;
		//offset_x=document.getElementById("offset_x").value;
		//offset_y=document.getElementById("offset_y").value;
		//offset_y=document.getElementById("offset_y").value;
		
		c.width=width;
		c.height=height;

		ctx.fillStyle="#"+background;
		ctx.fillRect(0,0,width,height);
		ctx.beginPath();
		ctx.moveTo(0,0);
		
		if(document.getElementById("check_grid").checked)
		DrawGrid();
		if(document.getElementById("check_axis").checked)
		DrawAxis();
		try{
			eval(codigo);
		}
		catch(err){
			alert("Erro no código");
		}
	}

	DrawGrid();
	DrawAxis();
	//Pequena
	Line(0,1,3,1,"#0011ff");
	Line(3,1,6,0,"#0011ff");
	
	Line(3,0,6,1,"#0022ff");
	Line(6,1,9,0,"#0022ff");

	//eval("
	Line(6,0,9,1,'#0033ff');

	Line(9,1,12,1,'#0033ff');
	//");
	//Textos
	ctx.font = '20pt Calibri';
    ctx.fillStyle = 'blue';
    ctx.fillText('Pequena', 50, 120);

    ctx.fillText('Média', 290, 120);
    ctx.fillText('Grande', 480, 120);

	//MakeLine(0,1,6,0);
	//MakeLine(1,1,10,1);
	//MakeLine(1,5,10,2);

	function DrawAxis(){
		ctx.beginPath();
		//horizontal
		DrawLine(0,height-offset_y,width,height-offset_y,2,"#000");
		//vertical
		DrawLine(offset_x,height,offset_x,0,2,"#000");
		ctx.closePath();
		if(document.getElementById("check_arrows").checked){
		ctx.beginPath();
		//seta horizontal
		DrawLine(width,height-offset_y,width-20,height-offset_y-5,2,"#000");
		DrawLine(width,height-offset_y,width-20,height-offset_y+5,2,"#000");
		//seta vertical
		DrawLine(offset_x,0,offset_x-5,20,2,"#000");
		DrawLine(offset_x,0,offset_x+5,20,2,"#000");
		ctx.fillStyle='#000';
		ctx.closePath();
		}
		//ctx.fill();
	}

	function DrawGrid(){
		ctx.beginPath();
		for(var i=offset_x; i<width; i+=20){
			DrawLine(i,height-offset_y,i,0,1,grid_color);

		}
		for(var j=0; j<height; j+=20){
			DrawLine(offset_x,j-offset_y,width,j-offset_y,1,grid_color);
		}
		ctx.closePath();
	}


	function Line(a,b,x,y){
		ctx.beginPath();
		var real_x = offset_x+(x*(width-offset_x))/max_x;
		var real_y = (height-offset_y)-(y*(height-offset_y))/max_y;
		var real_a = offset_x+(a*(width-offset_x))/max_x;
		var real_b = (height-offset_y)-(b*(height-offset_y))/max_y;

		ctx.moveTo(real_a,real_b);
		ctx.lineTo(real_x,real_y);
		ctx.lineWidth=3;
		ctx.stroke();
		ctx.closePath();
	}


	function Line(a,b,x,y,c){
		ctx.beginPath();
		var real_x = offset_x+(x*(width-offset_x))/max_x;
		var real_y = (height-offset_y)-(y*(height-offset_y))/max_y;
		var real_a = offset_x+(a*(width-offset_x))/max_x;
		var real_b = (height-offset_y)-(b*(height-offset_y))/max_y;

		ctx.moveTo(real_a,real_b);
		ctx.lineTo(real_x,real_y);
		ctx.lineWidth=3;
		ctx.strokeStyle = c;
		ctx.stroke();
		ctx.closePath();
	}

	function Marker(eixo,valor){
		var posx=0;
		var posy=0;
		ctx.beginPath();
		if(eixo=='x'){
			posx = offset_x+(valor*(width-offset_x))/max_x;
			posy = height-offset_y;
			DrawLine(posx,posy,posx,posy+10,1,"#000");
			ctx.font = '12pt Calibri';
    		ctx.fillStyle = "#000";
    		ctx.textAlign = 'center';
    		var texto = valor.toString();
			ctx.fillText(texto, posx, posy+22);

		}
		else{
			posx=offset_x;
			posy=(height-offset_y)-(valor*(height-offset_y))/max_y;
			DrawLine(offset_x,posy,posx-10,posy,1,"#000");
			ctx.font = '12pt Calibri';
    		ctx.fillStyle = "#000";
    		ctx.textAlign = 'right';
    		var texto = valor.toString();
    		var tamanho = texto.length;
			ctx.fillText(texto, posx-11, posy+4,offset_x);
		}
	}

	//size and color
	function SetFont(s,c){
		ctx.font = s+'pt Calibri';
    	ctx.fillStyle = c;
	}

	function Text(text,x,y){	
    	ctx.fillText(text, x, y);
	}

	function DrawLine(a,b,x,y,w,c){
		ctx.moveTo(a,b);
		ctx.lineTo(x,y);
		ctx.lineWidth=w;
		ctx.strokeStyle = c;
		ctx.stroke();
	}

