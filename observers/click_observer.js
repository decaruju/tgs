import Observer from './observer.js';

class ClickObserver extends Observer {
    attach(state) {
        const elemLeft = state.canvas.offsetLeft + state.canvas.clientLeft;
        const elemTop = state.canvas.offsetTop + state.canvas.clientTop;
        state.canvas.addEventListener('click', function(event) {
            const x = event.pageX - elemLeft + state.transform.center.x;
            const y = event.pageY - elemTop + state.transform.center.y;

            state.getEntities(['clickable', 'position', 'drawableRect']).forEach(function(entity) {
                if (
                    y > entity.position.y
                    && y < entity.position.y + entity.drawableRect.height
                    && x > entity.position.x
                    && x < entity.position.x + entity.drawableRect.width
                   ) {
                    entity.clickable.callback();
                }
            });

        }, false);
    }
}

export default ClickObserver;
