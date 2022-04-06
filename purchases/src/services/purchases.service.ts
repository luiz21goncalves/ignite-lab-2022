import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CreatePurchaseParams = {
  product_id: string;
  customer_id: string;
};

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.purchase.create({
      data: {
        product_id,
        customer_id,
      },
    });
  }
}
