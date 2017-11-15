/**
 * @author mrdoob / http://mrdoob.com/
 */
"use strict";
var Stats = (function () {
    function Stats() {
        this.ms = 0;
        this.msMin = Infinity;
        this.msMax = 0;
        this.fps = 0;
        this.fpsMin = Infinity;
        this.fpsMax = 0;
        this.frames = 0;
        this.REVISION = 11;
        this.container = document.createElement('div');
        this.startTime = Date.now();
        var prevTime = this.startTime;
        this.container.id = 'stats';
        this.container.addEventListener('mousedown', function (event) { event.preventDefault(); this.setMode(++this.mode % 2); }, false);
        this.container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';
        this.fpsDiv = document.createElement('div');
        this.fpsDiv.id = 'fps';
        this.fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
        this.container.appendChild(this.fpsDiv);
        this.fpsText = document.createElement('div');
        this.fpsText.id = 'fpsText';
        this.fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
        this.fpsText.innerHTML = 'FPS';
        this.fpsDiv.appendChild(this.fpsText);
        this.fpsGraph = document.createElement('div');
        this.fpsGraph.id = 'fpsGraph';
        this.fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
        this.fpsDiv.appendChild(this.fpsGraph);
        while (this.fpsGraph.children.length < 74) {
            var bar = document.createElement('span');
            bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
            this.fpsGraph.appendChild(bar);
        }
        this.msDiv = document.createElement('div');
        this.msDiv.id = 'ms';
        this.msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
        this.container.appendChild(this.msDiv);
        this.msText = document.createElement('div');
        this.msText.id = 'msText';
        this.msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
        this.msText.innerHTML = 'MS';
        this.msDiv.appendChild(this.msText);
        this.msGraph = document.createElement('div');
        this.msGraph.id = 'msGraph';
        this.msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
        this.msDiv.appendChild(this.msGraph);
        while (this.msGraph.children.length < 74) {
            var bar = document.createElement('span');
            bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
            this.msGraph.appendChild(bar);
        }
    }
    Object.defineProperty(Stats.prototype, "domElement", {
        get: function () { return this.container; },
        enumerable: true,
        configurable: true
    });
    Stats.prototype.updateGraph = function (dom, value) {
        var child = dom.appendChild(dom.firstChild);
        child.style.height = value + 'px';
    };
    Stats.prototype.setMode = function (value) {
        this.mode = value;
        switch (this.mode) {
            case 0:
                this.fpsDiv.style.display = 'block';
                this.msDiv.style.display = 'none';
                break;
            case 1:
                this.fpsDiv.style.display = 'none';
                this.msDiv.style.display = 'block';
                break;
        }
    };
    Stats.prototype.begin = function () {
        this.startTime = Date.now();
    };
    Stats.prototype.end = function () {
        var time = Date.now();
        this.ms = time - this.startTime;
        this.msMin = Math.min(this.msMin, this.ms);
        this.msMax = Math.max(this.msMax, this.ms);
        this.msText.textContent = this.ms + ' MS (' + this.msMin + '-' + this.msMax + ')';
        this.updateGraph(this.msGraph, Math.min(30, 30 - (this.ms / 200) * 30));
        this.frames++;
        if (time > this.prevTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (time - this.prevTime));
            this.fpsMin = Math.min(this.fpsMin, this.fps);
            this.fpsMax = Math.max(this.fpsMax, this.fps);
            this.fpsText.textContent = this.fps + ' FPS (' + this.fpsMin + '-' + this.fpsMax + ')';
            this.updateGraph(this.fpsGraph, Math.min(30, 30 - (this.fps / 100) * 30));
            this.prevTime = time;
            this.frames = 0;
        }
        return time;
    };
    Stats.prototype.update = function () {
        this.startTime = this.end();
    };
    return Stats;
}());
exports.Stats = Stats;
