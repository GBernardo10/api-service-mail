import { Field, InputType } from '@nestjs/graphql';

@InputType()
class StatusMailStoreConnectInput {
  @Field()
  readonly id: string;
}

@InputType()
class StatusMailStore {
  @Field({ nullable: true })
  readonly connect: StatusMailStoreConnectInput;
}

@InputType()
export default class MailStatusInput {
  @Field({ defaultValue: 'stage' })
  readonly status: string;

  @Field()
  readonly mail: StatusMailStore;
}
