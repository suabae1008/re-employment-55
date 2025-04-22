
export const getFavoriteJobs = async (): Promise<Job[]> => {
  const allJobs = await fetchJobs();
  const favoriteJobIds = getFavoriteJobIds();
  const favoriteJobs = allJobs.filter(job => favoriteJobIds.includes(job.id.toString()));

  // Special handling for specific jobs to demonstrate different matching analysis states
  return favoriteJobs.map(job => {
    if (job.company === '제우스 아이엔씨') {
      // This job will show as "매칭점수 준비중"
      return {
        ...job,
        matchingStatus: 'pending'
      };
    }
    if (job.company === '은빛재가복지센터') {
      // This job will show as "매칭점수 80점"
      return {
        ...job,
        matchingStatus: 'completed',
        matchScore: 80
      };
    }
    return job;
  });
};
