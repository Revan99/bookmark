import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/strategy';
import { BookmarkService } from './bookmark.service';
import { User } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  createBookmark(
    @User('userId') userId: number,
    @Body() dto: CreateBookmarkDto,
  ): ReturnType<typeof this.bookmarkService.createBookmark> {
    console.log(userId);
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get()
  getBookmarks(
    @User('userId') userId: number,
  ): ReturnType<typeof this.bookmarkService.getBookmarks> {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @User('userId') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ): ReturnType<typeof this.bookmarkService.getBookmarkById> {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Patch(':id')
  updateBookmarkById(
    @User('userId') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ): ReturnType<typeof this.bookmarkService.updateBookmarkById> {
    return this.bookmarkService.updateBookmarkById(userId, bookmarkId, dto);
  }

  @Delete(':id')
  deleteBookmarkById(
    @User('userId') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ): ReturnType<typeof this.bookmarkService.deleteBookmarkById> {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
