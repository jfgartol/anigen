/**
 *  @author		Ondrej Benda
 *  @date		2011-2017
 *  @copyright	GNU GPLv3
 *	@brief		Editor's section with information about time and zoom
 */
function infoEditor(timeline) {
    this.container = document.createElement("div");
    this.container.addClass('editor');
// modified to solve error that makes thi button only working one time
    this.pauseButton = new uiButton(
        ['play_arrow', 'pause'], ['svg.pauseToggle(true);this.pauseButton.setState(0);', 'svg.pauseToggle(false);this.pauseButton.setState(1);'], ['Pause animations', 'Unpause animations']
    );
    this.pauseButton = this.pauseButton.shepherd;
    this.container.appendChild(this.pauseButton.container);

    this.hideIcon = new uiButton(
        'timer',
        'anigenManager.classes.editor.clock.toggle();',
        'Hide/show clock'
    );
    this.hideIcon = this.hideIcon.shepherd;
    this.container.appendChild(this.hideIcon.container);

    this.clock = new clock(timeline);
    this.clock.display();
    this.container.appendChild(this.clock.container);


    this.zoomIcon = new uiButton(
        'search',
        'svg.zoom = 1; svg.refreshUI(true);',
        'Reset zoom'
    );
    this.zoomIcon = this.zoomIcon.shepherd;
    this.container.appendChild(this.zoomIcon.container);

    this.zoomValue = document.createElement("span");
    this.container.appendChild(this.zoomValue);

    this.refreshZoom();

}

infoEditor.prototype.refreshZoom = function() {
    this.zoomValue.removeChildren();
    this.zoomValue.appendChild(document.createTextNode(svg.getZoomReadable()));
}

infoEditor.prototype.refreshPause = function() {
    if (svg.svgElement.animationsPaused()) {
        this.pauseButton.setState(0);
    } else {
        this.pauseButton.setState(1);
    }
}
