import { style } from '@angular/animations';

export const swingRight = [
    style({opacity: 1, transform: 'translateX(0)', offset: 0}),
    style({opacity: 0.9, transform: 'translateX(-15px)',  offset: .4}),
    style({opacity: 0.7, transform: 'translateX(-30px)',  offset: .6}),
    style({transform: 'none', offset: 1}),
]

export const swingLeft = [
    style({opacity: 1, transform: 'translateX(0)', offset: 0}),
    style({opacity: 0.8, transform: 'translateX(15px)',  offset: .4}),
    style({opacity: 0.7, transform: 'translateX(30px)',  offset: .6}),
    style({transform: 'none', offset: 1}),
]