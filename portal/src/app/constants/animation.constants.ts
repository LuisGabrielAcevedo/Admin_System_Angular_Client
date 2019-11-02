import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

export const AnimateGallery = trigger('animateGallery', [
  state(
    'slideInLeft',
    style({
      display: 'block',
      opacity: '1',
      transform: 'translate(0, 0)'
    })
  ),
  state(
    'slideOutLeft',
    style({
      display: 'none',
      opacity: '0',
      transform: 'translate(-100% 0)'
    })
  ),
  state(
    'slideInRight',
    style({
      display: 'block',
      opacity: '1',
      transform: 'translate(0, 0)'
    })
  ),
  state(
    'slideOutRight',
    style({
      display: 'none',
      opacity: '0',
      transform: 'translate(100%, 0)'
    })
  ),
  state(
    'slideInUp',
    style({
      display: 'block',
      opacity: '1',
      transform: 'translate(0, 0%)'
    })
  ),
  state(
    'slideOutUp',
    style({
      display: 'none',
      opacity: '0',
      transform: 'translate(0, -100%)'
    })
  ),
  state(
    'slideInDown',
    style({
      display: 'block',
      opacity: '1',
      transform: 'translate(0, 0%)'
    })
  ),
  state(
    'slideOutDown',
    style({
      display: 'none',
      opacity: '0',
      transform: 'translate(0, 100%)'
    })
  ),
  state(
    'fadeIn',
    style({
      display: 'block',
      opacity: '1',
      transform: 'translate(0, 0)'
    })
  ),
  state(
    'fadeOut',
    style({
      display: 'block',
      opacity: '0',
      transform: 'translate(0, 0)'
    })
  ),
  state('wobble', style({ display: 'block' })),
  state('swing', style({ display: 'block' })),
  state(
    'accordionClose',
    style({
      height: '0px',
      overflow: 'hidden',
      display: 'none',
      padding: '0'
    })
  ),
  state(
    'accordionOpen',
    style({
      height: '*',
      overflow: 'visible',
      display: 'block',
      padding: '*'
    })
  ),
  state(
    'toastClose',
    style({
      height: '0px',
      overflow: 'hidden',
      display: 'none',
      paddingTop: '0',
      paddingBottom: '0',
      marginBottom: '0'
    })
  ),
  state(
    'toastOpen',
    style({
      height: '*',
      overflow: 'visible',
      display: 'block',
      paddingTop: '*',
      paddingBottom: '*',
      marginBottom: '*'
    })
  ),
  state(
    'bounceInDown',
    style({
      opacity: '1',
      height: '*',
      overflow: 'visible',
      display: 'block',
      padding: '*'
    })
  ),
  state(
    'turnInDown',
    style({
      display: 'block',
      opacity: '1',
      transform: 'rotateZ(0) translate(0,0)'
    })
  ),
  state(
    'turnOutDown',
    style({
      display: 'block',
      opacity: '1',
      transform: 'rotateZ(60deg) translate(0, 1000%)'
    })
  ),
  state(
    'turnInUp',
    style({
      display: 'block',
      opacity: '1',
      transform: 'rotateZ(0) translate(0,0)'
    })
  ),
  state(
    'turnOutUp',
    style({
      display: 'block',
      opacity: '1',
      transform: 'rotateZ(-60deg) translate(0, -1000%)'
    })
  ),
  state(
    'buzz',
    style({
      display: 'block',
      opacity: '1',
      transform: 'rotateZ(0) translate(0, 0)'
    })
  ),

  transition('* => slideInLeft, void => slideInLeft', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(-100%, 0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => slideOutLeft, void => slideOutLeft', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(-100%, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => slideInRight, void => slideInRight', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(100%, 0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => slideOutRight, void => slideOutRight', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(100%, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => slideInUp, void => slideInUp', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(0, -100%)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => slideOutUp, void => slideOutUp', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(0, -100%)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => slideInDown, void => slideInDown', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(0, 100%)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => slideOutDown, void => slideOutDown', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(0, 100%)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => fadeIn, void => fadeIn', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(0, 0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => fadeOut, void => fadeOut', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'translate(0, 0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '0',
          transform: 'translate(0, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => wobble, void => wobble', [
    animate(
      '750ms ease-in-out',
      keyframes([
        style({
          transform: 'translate(-25%, 0) rotate( -5deg)',
          offset: 0.15
        }),
        style({
          transform: 'translate(20%, 0) rotate( 3deg)',
          offset: 0.3
        }),
        style({
          transform: 'translate(-15%, 0) rotate( -3deg)',
          offset: 0.45
        }),
        style({
          transform: 'translate(10%, 0) rotate( 2deg)',
          offset: 0.6
        }),
        style({
          transform: 'translate(-5%, 0) rotate( -1deg)',
          offset: 0.75
        }),
        style({ transform: 'none', offset: 1 })
      ])
    )
  ]),
  transition('* => swing, void => swing', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({ transform: 'translateX(15%)', offset: 0.2 }),
        style({ transform: 'translateX(-10%)', offset: 0.4 }),
        style({ transform: 'translateX(5%)', offset: 0.6 }),
        style({ transform: 'translateX(-5%)', offset: 0.8 }),
        //style({ transform: 'translate3d(0, 0, 1, 0deg)', offset: 1 }),
        style({ transform: 'none', offset: 1 })
      ])
    )
  ]),
  transition('* => accordionOpen', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          overflow: 'hidden',
          display: 'block',
          padding: '0',
          height: '0',
          offset: 0
        }),
        style({
          overflow: 'hidden',
          display: 'block',
          padding: '*',
          height: '*',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => accordionClose', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          overflow: 'hidden',
          display: 'block',
          padding: '*',
          height: '*',
          offset: 0
        }),
        style({
          overflow: 'hidden',
          display: 'block',
          padding: '0',
          height: '0',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => toastOpen', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          overflow: 'hidden',
          display: 'block',
          paddingTop: '0',
          paddingBottom: '0',
          height: '0',
          marginBottom: '0',
          offset: 0
        }),
        style({
          overflow: 'hidden',
          display: 'block',
          paddingTop: '*',
          paddingBottom: '*',
          height: '*',
          marginBottom: '*',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => toastClose', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          overflow: 'hidden',
          display: 'block',
          paddingTop: '*',
          paddingBottom: '*',
          height: '*',
          marginBottom: '*',
          offset: 0
        }),
        style({
          overflow: 'hidden',
          display: 'block',
          paddingTop: '0',
          paddingBottom: '0',
          height: '0',
          marginBottom: '*',
          offset: 0.7
        }),
        style({
          overflow: 'hidden',
          display: 'block',
          paddingTop: '0',
          paddingBottom: '0',
          height: '0',
          marginBottom: '0',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => bounceInDown', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({
          opacity: '1',
          height: '0',
          overflow: 'hidden',
          padding: '0',
          transform: 'translate(0, 0)',
          offset: 0
        }),
        style({
          opacity: '1',
          height: '*',
          overflow: 'hidden',
          padding: '*',
          transform: 'translate(0, 10px) ',
          offset: 0.3
        }),
        style({
          opacity: '1',
          height: '*',
          overflow: 'hidden',
          padding: '*',
          transform: 'translate(0, 0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => turnInDown, void => turnInDown', [
    animate(
      '1400ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'rotateZ(60deg) translate(0, 1000%)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'rotateZ(0) translate(0,0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => turnOutDown, void => turnOutDown', [
    animate(
      '1400ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'rotateZ(0) translate(0,0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'rotateZ(60deg) translate(0, 1000%)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => turnInUp, void => turnInUp', [
    animate(
      '1400ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'rotateZ(-60deg) translate(0, -1000%)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'rotateZ(0) translate(0,0)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => turnOutUp, void => turnOutUp', [
    animate(
      '1400ms ease-in-out',
      keyframes([
        style({
          display: 'block',
          opacity: '1',
          transform: 'rotateZ(0) translate(0,0)',
          offset: 0
        }),
        style({
          display: 'block',
          opacity: '1',
          transform: 'rotateZ(-60deg) translate(0, -1000%)',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => buzz', [
    animate(
      '1000ms ease-out',
      keyframes([
        style({ transform: 'translate(0, 0) 	 rotate( 0)', offset: 0 }),
        style({
          transform: 'translate(3px, 0)  rotate( 0.3deg)',
          offset: 0.1
        }),
        style({
          transform: 'translate(-3px, 0) rotate( -0.3deg)',
          offset: 0.2
        }),
        style({
          transform: 'translate(3px, 0)  rotate( 0.3deg)',
          offset: 0.3
        }),
        style({
          transform: 'translate(-3px, 0) rotate( -0.3deg)',
          offset: 0.4
        }),
        style({
          transform: 'translate(3px, 0)  rotate( 0.3deg)',
          offset: 0.5
        }),
        style({
          transform: 'translate(-3px, 0) rotate( -0.3deg)',
          offset: 0.6
        }),
        style({
          transform: 'translate(3px, 0)  rotate( 0.3deg)',
          offset: 0.7
        }),
        style({
          transform: 'translate(-3px, 0) rotate(-0.3deg)',
          offset: 0.8
        }),
        style({
          transform: 'translate(3px, 0)  rotate(0.3deg)',
          offset: 0.9
        }),
        style({ transform: 'none', offset: 1 })
      ])
    )
  ])
]);
