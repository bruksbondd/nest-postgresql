
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { Injectable } from '@nestjs/common';
import { WatchlistDTO } from './dto';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private readonly watchlistRepository: typeof Watchlist) {}

    async createAsset(user, dto): Promise<boolean> {
        const watchlist = {
            user: user.id,
            name: dto.name,
            assetId: dto.assetId
        }
        await this.watchlistRepository.create(watchlist)
        return true
    }

    async getAllAssets(userId: number): Promise<Watchlist[]> {
        return await this.watchlistRepository.findAll({
            where: { user:  userId},
          })
    }

    async updateAsset(userId: number, dto: WatchlistDTO): Promise<WatchlistDTO> {
        await this.watchlistRepository.update(dto, {where: {user: userId}})
        return dto
    }

    async deleteAsset(userId: number, assetId: string): Promise<boolean> {
        await this.watchlistRepository.destroy({where: {id: assetId, user: userId}})
        return true
    }
}
