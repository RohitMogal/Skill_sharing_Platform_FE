import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      imageUrl: 'https://plus.unsplash.com/premium_photo-1663013500813-328e1ab77be7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25saW5lJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww',
      quote: '"In the online world, each time you learn something new."',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG9ubGluZSUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
      quote: '"The beautiful thing about learning is that it can happen anywhere"',
    },
    {
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661512451481-03be58aada7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fG9ubGluZSUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
      quote: '"Online learning is not the next big thing; it is the now big thing."',
    },
  ];
  currentSlideIndex: number = 0;
  slideInterval: any;
animation: any;

  constructor() { }

  ngOnInit(): void {
  }
}
