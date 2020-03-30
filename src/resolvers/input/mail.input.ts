import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class MailInput {
  @Field()
  readonly to: string;
  @Field()
  readonly from: string;
  @Field()
  readonly subject: string;
  @Field()
  readonly body: string;
}
