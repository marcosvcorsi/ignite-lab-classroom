import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

type PurchaseCreatedPayload = {
  customer: {
    authUserId: string;
  };
  product: {
    id: string;
    title: string;
    slug: string;
  };
};

@Controller()
export class PurchasesController {
  @EventPattern('purchases.purchase-created')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    console.log('purchaseCreated', payload);
  }
}
