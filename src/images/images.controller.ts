import { Controller, Get, Param, Res } from "@nestjs/common";
import { ApiTags, ApiParam } from "@nestjs/swagger";
import { join } from "path";
import { Observable, of } from "rxjs";

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor() {}
  @Get('product/:name')
  @ApiParam({name:'name',type:String})
  findProductImage(@Param('name') imagename, @Res() res): Observable<Object> {
      return of(res.sendFile(join(process.cwd(), 'uploads/product-images/' + imagename)));
  }



}