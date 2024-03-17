import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { Injectable } from '@nestjs/common';
import { WatchlistDTO } from './dto';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {}

  async createAsset(user, dto): Promise<CreateAssetResponse> {
    try {
      const watchlist = {
        user: user.id,
        name: dto.name,
        assetId: dto.assetId,
      };
      await this.watchlistRepository.create(watchlist);

      return watchlist;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllAssets(userId: number): Promise<Watchlist[]> {
    try {
      return await this.watchlistRepository.findAll({
        where: { user: userId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateAsset(userId: number, dto: WatchlistDTO): Promise<WatchlistDTO> {
    try {
      await this.watchlistRepository.update(dto, { where: { user: userId } });
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({
        where: { id: assetId, user: userId },
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
