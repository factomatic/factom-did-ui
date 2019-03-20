import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
  protected successMessage = `You're done! Your DID is in` +
  `the process of being recorded on the Factom blockchain and it shoud be included in the next block. You can track ` +
  `the progress in the blockchain explorer.`;
  // tslint:disable-next-line:max-line-length
  protected externalLink = 'https://explorer.factom.com/chains/48a6d3b527ff807c805d55bc4e07f77eae0f5267085c2423d27a27f0342ae3ed/entries/120bea646ca03c4654ebb5b123eb0b09df2f2bf86f9270cd1d169c717b84d5da';

  constructor() { }

  ngOnInit() {
  }

}
