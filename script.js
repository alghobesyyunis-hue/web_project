// الجافاسكريبت للتفاعل الديناميكي مع المدخلات ولوحة التحكم

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. رسالة ترحيبية تتغير حسب الوقت في رأس الصفحة
    const greetingEl = document.getElementById('greeting-text');
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
        greetingEl.textContent = "صباح الخير، مرحباً بك في بوابة جامعة عمران";
    } else if (currentHour < 18) {
        greetingEl.textContent = "مساء الخير، مرحباً بك في بوابة جامعة عمران";
    } else {
        greetingEl.textContent = "أهلاً بك، نسعد بخدمتك في بوابة الطالب الأكاديمية";
    }

    // عناصر الصفحة
    const studentForm = document.getElementById('studentForm');
    const studentIdInput = document.getElementById('studentId');
    const studentPasswordInput = document.getElementById('studentPassword');
    const formMessage = document.getElementById('formMessage');
    
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const displayedId = document.getElementById('displayedId');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const interactiveCards = document.querySelectorAll('.interactive-card');
    const serviceResult = document.getElementById('serviceResult');

    // 2. التفاعل عند الضغط على زر دخول النظام وإدخال البيانات
    studentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        const studentId = studentIdInput.value.trim();
        const password = studentPasswordInput.value.trim();

        // التحقق من الحقول
        if (studentId === "" || password === "") {
            formMessage.style.color = "#dc2626";
            formMessage.textContent = "⚠️ عذراً، يجب إدخال رقم القيد وكلمة المرور أولاً!";
            return;
        }

        if (studentId.length < 3) {
            formMessage.style.color = "#dc2626";
            formMessage.textContent = "⚠️ رقم القيد غير صحيح، يرجى التأكد من المدخلات.";
            return;
        }

        // نجاح التحقق - عرض رسالة وتغيير واجهة الصفحة بشكل تفاعلي
        formMessage.style.color = "#16a34a";
        formMessage.textContent = "✅ تم تسجيل الدخول بنجاح! جاري فتح لوحة التحكم...";

        setTimeout(() => {
            // إخفاء نموذج تسجيل الدخول وإظهار لوحة التحكم الخاصة بالطالب
            loginSection.style.display = 'none';
            dashboardSection.style.display = 'block';
            displayedId.textContent = studentId; // عرض رقم القيد الذي كتبه الطالب
            
            // إعادة تعيين النموذج
            formMessage.textContent = "";
            studentForm.reset();
        }, 1000);
    });

    // 3. زر تسجيل الخروج للعودة لصفحة الدخول
    logoutBtn.addEventListener('click', () => {
        dashboardSection.style.display = 'none';
        loginSection.style.display = 'block';
        serviceResult.style.display = 'none';
    });

    // 4. تفاعل بطاقات الخدمات داخل لوحة التحكم عند النقر عليها
    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.getAttribute('data-service');
            serviceResult.style.display = 'block';
            
            if (serviceName === "النتائج الدراسية") {
                serviceResult.innerHTML = "📊 <strong>النتائج الدراسية:</strong> المعدل التراكمي: 3.85 (ممتاز) - جميع المواد مسجلة وناجح فيها.";
            } else if (serviceName === "التسجيل والمقررات") {
                serviceResult.innerHTML = "📚 <strong>المقررات المسجلة:</strong> تصميم ويب، شبكات حاسوب، قواعد بيانات (Oracle)، لغة تجميع (Assembly).";
            } else if (serviceName === "الجدول الدراسي") {
                serviceResult.innerHTML = "📅 <strong>الجدول الدراسي:</strong> المحاضرات تبدأ من السبت إلى الأربعاء ابتداءً من الساعة 8:00 صباحاً في قاعة 102.";
            }
        });
    });
});