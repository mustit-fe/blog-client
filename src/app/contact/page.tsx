import classNames from 'classnames';

export default function Page() {
  const sectionClasses = classNames('');
  const labelClasses = classNames('flex flex-col gap-y-1 font-semibold text-themeBlue-500');
  const inputClasses = classNames('px-3 py-2 font-normal border-b');

  // TODO: 의견 수렴용 메일...? 고민...
  return (
    <>
      <p className="mt-8 text-themeBlue-500 text-2xl font-bold text-center">의견을 보내주세요!</p>
      <form className="flex flex-col gap-y-4 border rounded-2xl p-8 m-8 bg-themeGrey-100">
        <section className={sectionClasses}>
          <label htmlFor="name" className={labelClasses}>
            성함
            <input type="text" id="name" name="name" required className={inputClasses} />
          </label>
        </section>
        <section className={sectionClasses}>
          <label htmlFor="email" className={labelClasses}>
            이메일
            <input type="email" id="email" name="email" required className={inputClasses} />
          </label>
        </section>

        <section className={sectionClasses}>
          <label htmlFor="message" className={labelClasses}>
            내용
            <textarea
              id="message"
              name="message"
              rows={4}
              cols={50}
              required
              placeholder="무슨 내용이든 좋아요!"
              className={inputClasses}
            />
          </label>
        </section>

        <input
          type="submit"
          value="보내기"
          className="text-lg text-themeBlue-500 hover:text-themeBlue-100 font-bold cursor-pointer"
        />
      </form>
    </>
  );
}
