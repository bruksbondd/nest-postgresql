
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private readonly watchlistRepository: typeof Watchlist) {}

    async createAsset(user, dto) {
        const watchlist = {
            user: user.id,
            name: dto.name,
            assetId: dto.assetId
        }
        await this.watchlistRepository.create(watchlist)
    }
}
