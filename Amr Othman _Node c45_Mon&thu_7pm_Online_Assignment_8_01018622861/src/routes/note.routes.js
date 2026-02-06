import { Router } from 'express';
import * as noteController from '../controllers/note.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

// حماية كل المسارات القادمة بالـ Auth Middleware
router.use(auth); 

// 1. إضافة ملحوظة (POST /notes)
router.post('/', noteController.addNote);

// 2. تحديث ملحوظة (PATCH /notes/:noteId)
router.patch('/:noteId', noteController.updateNote);

// 3. استبدال ملحوظة بالكامل (PUT /notes/replace/:noteId)
router.put('/replace/:noteId', noteController.replaceNote);

// 4. تحديث كل العناوين (PATCH /notes/all)
router.patch('/all', noteController.updateAllTitles);

// 5. حذف ملحوظة واحدة (DELETE /notes/:noteId)
router.delete('/:noteId', noteController.deleteNote);

// 6. عرض الملحوظات بصفحات وترتيب (GET /notes/paginate-sort)
router.get('/paginate-sort', noteController.getPaginatedNotes);

// 7. عرض ملحوظة بالـ ID (GET /notes/:noteId)
router.get('/:noteId', noteController.getNoteById);

// 8. بحث بالمحتوى (GET /notes/search-content)
router.get('/search-content', noteController.getNoteByContent);

// 9. عرض النوتس مع إيميل اليوزر (GET /notes/note-with-user)
router.get('/note-with-user', noteController.getNotesWithUser);

// 10. الـ Aggregation والبحث بالعنوان (GET /notes/aggregate)
router.get('/aggregate', noteController.aggregateNotes);

// 11. حذف كل ملحوظات المستخدم (DELETE /notes)
router.delete('/', noteController.deleteAllNotes);

export default router;