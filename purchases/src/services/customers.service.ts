import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CrateCustomerParams = {
  auth_user_id: string;
};

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getCustomerByAuthUserId(auth_user_id: string) {
    return this.prisma.customer.findUnique({
      where: {
        auth_user_id,
      },
    });
  }

  createCustomer({ auth_user_id }: CrateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        auth_user_id,
      },
    });
  }
}
