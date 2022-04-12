import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kefka.service';

type CreatePurchaseParams = {
  product_id: string;
  customer_id: string;
};

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  listAllFromCustomer(customer_id: string) {
    return this.prisma.purchase.findMany({
      where: {
        customer_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createPurchase({ product_id, customer_id }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const purchase = this.prisma.purchase.create({
      data: {
        product_id,
        customer_id,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customer_id,
      },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        auth_user_id: customer.auth_user_id,
      },
      product: {
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
