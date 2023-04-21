package com.notfound4.Member.Repository;

import com.notfound4.Member.Entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    Member findByMemberId(Long memberId);

}
