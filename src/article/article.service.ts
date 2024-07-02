import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createArticleDto: Prisma.ArticleCreateInput) {
    return this.databaseService.article.create({
      data: createArticleDto,
    });
  }

  async findAll() {
    return this.databaseService.article.findMany({
      where: { published: true },
    });
  }

  async findDrafts() {
    return this.databaseService.article.findMany({
      where: { published: false },
    });
  }

  async findOne(id: number) {
    const article = await this.databaseService.article.findUnique({
      where: {
        id,
      },
    });
    if (!article) throw new NotFoundException(`Article with this ID not found`);
    return this.databaseService.article.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateArticleDto: Prisma.ArticleUpdateInput) {
    return this.databaseService.article.update({
      where: {
        id,
      },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.databaseService.article.delete({
      where: {
        id,
      },
    });
  }
}
