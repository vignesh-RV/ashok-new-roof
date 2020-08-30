import { Component, OnInit } from '@angular/core';
import { PurchaseType } from 'src/app/models/purchase-types';
import { CommonService } from 'src/app/services/common.service';
import { APP_MSGS, TOASTER_TYPES } from 'src/app/constants/app.properties';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  purchaseTypes:PurchaseType[] = [
    {
      priceDescription : 'Price One',
      price:'$19',
      userCount:"1 user",
      description:[
        '3D diagram of roof',
        '3 Clients',
        'Unlimited Messages'
      ],
      iconClass: "color_lens"
    },
    {
      priceDescription : 'Price Two',
      price:'$29',
      userCount:"5 user",
      description:[
        '3D diagram of roof',
        '3 Clients',
        'Unlimited Messages'
      ],
      iconClass: "apartment"
    },
    {
      priceDescription : 'Price Three',
      price:'$39',
      userCount:"10 user",
      description:[
        '3D diagram of roof',
        '3 Clients',
        'Unlimited Messages'
      ],
      iconClass: "flash_on"
    }
  ]

  constructor(private common:CommonService) { }

  ngOnInit() {
  }

  doPayment(): any{
    this.common.showToaster( TOASTER_TYPES.SUCCESS ,APP_MSGS.SUCCESS.PAYMENT_DONE);
    this.common.redirectTo("projects");
  }
}
