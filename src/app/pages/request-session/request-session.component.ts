import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-session',
  templateUrl: './request-session.component.html',
  styleUrls: ['./request-session.component.css']
})
export class RequestSessionComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
