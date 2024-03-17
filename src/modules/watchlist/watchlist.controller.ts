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
import { CreateAssetResponse } from './response';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @ApiResponse({status: 201, type: CreateAssetResponse})
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchlistDTO, @Req() request): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @ApiTags('API')
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  getAllAsets(@Req() request): Promise<WatchlistDTO[]> {
    const {id} = request.user;
    return this.watchlistService.getAllAssets(id);
  }

  @ApiTags('API')
  @ApiResponse({status: 201})
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateAsset(@Body() assetDto: WatchlistDTO, @Req() request): Promise<WatchlistDTO> {
    const {id} = request.user;
    return this.watchlistService.updateAsset(id, assetDto);
  }

  @ApiTags('API')
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const {id} = request.user;
    return this.watchlistService.deleteAsset(id, assetId)
  }
}
