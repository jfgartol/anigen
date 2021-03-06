/**
 *  @author		Ondrej Benda
 *  @date		2011-2016
 *  @copyright	GNU GPLv3
 *	@brief		Linear connector (white with black outline) between two elements with .x and .y properties
 */
function connector(pointA, pointB, color) {
	if(pointA == null || pointB == null) { return; }
	
	this.pointA = pointA;
	this.pointB = pointB;
	
	if(this.pointA instanceof anchor || this.pointA instanceof anchorAngle) {
		this.pointA.addConnector(this);
	}
	if(this.pointB instanceof anchor || this.pointB instanceof anchorAngle) {
		this.pointB.addConnector(this);
	}
	
	this.container = document.createElementNS(svgNS, 'g');
	this.path = document.createElementNS(svgNS, 'line');
	this.container.appendChild(this.path);
	
	if(!color) { color = '#0000aa'; }
	
    this.path.setAttribute("style", "stroke-linecap:round;fill:none;stroke:"+color);
	
	this.adjustZoom();
	this.refresh();
	
	this.container.shepherd = this;
}

connector.prototype.adjustZoom = function() {
	this.path.setAttribute("stroke-width", 1.5/svg.zoom+"px");
}

connector.prototype.refresh = function() {
	var CTM = this.path.getCTMBase();
	
	var absA = (typeof this.pointA.getAbsolute === 'function') ? this.pointA.getAbsolute() : { 'x': this.pointA.x, 'y': this.pointA.y };
	var absB = (typeof this.pointB.getAbsolute === 'function') ? this.pointB.getAbsolute() : { 'x': this.pointB.x, 'y': this.pointB.y };
	
	var adjA = CTM.toUserspace(absA.x, absA.y);
	var adjB = CTM.toUserspace(absB.x, absB.y);
	
	this.path.setAttribute('x1', adjA.x);
	this.path.setAttribute('y1', adjA.y);
	this.path.setAttribute('x2', adjB.x);
	this.path.setAttribute('y2', adjB.y);
}

connector.prototype.setSize = function(value) {
	if(!value || isNaN(value) || value <= 0) { return; }
	this.size = value;
	this.path.setAttribute("stroke-width", this.size+"px");
}

connector.prototype.hide = function() {
	this.container.setAttribute('display', 'none');
}