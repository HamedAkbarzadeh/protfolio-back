import { BadRequestException, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs'

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination(req, file, cb) {
                    const folder = req.query.folder as string || 'default';
                    const uploadPath = `public/uploads/${folder}`;

                    if (!fs.existsSync(uploadPath)) {
                        fs.mkdirSync(uploadPath, { recursive: true })
                    }
                    cb(null, uploadPath)
                },
                filename: (_req, file, cb) => {
                    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname))
                },

            }),
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (_req, file, cb) => {

                if (!file.mimetype.match(/^image\/(png|jpe?g|webp)$/)) {
                    return cb(new BadRequestException('Only image files are allowed'), false);
                }
                cb(null, true)
            }
        })
    ],
    controllers: [UploadController]
})
export class UploadModule { }
