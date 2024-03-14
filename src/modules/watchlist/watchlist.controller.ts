import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchlistDTO, @Req() request) {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @Get('get-all')
  getAllAsets() {}

  @Patch('update')
  updateAsset() {}

  @Delete()
  deleteAsset(@Query('id') id: string) {
    return;
  }
}
