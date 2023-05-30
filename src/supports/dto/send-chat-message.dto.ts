import { ApiProperty } from "@nestjs/swagger";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";
import { MessageType } from "../entities/support-detail.entity";

export class SendChatDto {
    @ApiProperty({type:Number})
    supportId: number;
    @ApiProperty({type:Number})
    clientId: number;
    @ApiProperty({type:Number})
    answerId: number;
    @ApiProperty({type:String})
    message: string;
    @ApiProperty({enum:MessageType,description: Object.values(MessageType).toString()})
    type: MessageType;
}