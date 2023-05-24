import { UseGuards, Controller, Post, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { AddressService } from "./address.service";
import { SearchProvinceDto } from "./dto/search-province.dto";
import { SearchDistrictDto } from "./dto/search-district.dto";
import { SearchSubDistrictDto } from "./dto/search-sub-district.dto";
@ApiTags('Address')
@UseGuards(JwtAuthGuard)
@Controller('address')
@ApiBearerAuth()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Post('country')
  child() {
    return this.addressService.getCountry();
  }
  @Post('province')
  province(@Body() dto:SearchProvinceDto) {
    return this.addressService.getProvince(dto);
  }
  @Post('district')
  district(@Body() dto:SearchDistrictDto) {
    return this.addressService.getDistrict(dto);
  }
  @Post('sub-district')
  subDistrict(@Body() dto:SearchSubDistrictDto) {
    return this.addressService.getSubDistrict(dto);
  }
}